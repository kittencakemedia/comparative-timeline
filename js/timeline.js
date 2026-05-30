// Timeline Class
class Timeline {
    constructor(events, modal) {
        this.allEvents = events;
        this.events = events;
        this.activeFilter = 'all';
        this.modal = modal;
        this.zoom = 70;
        this.minZoom = 35;
        this.maxZoom = 160;
        this.init();
    }
    
    init() {
        this.topTrack = document.getElementById('top-timeline');
        this.bottomTrack = document.getElementById('bottom-timeline');
        this.scrollContainer = document.querySelector('.timeline-scroll');
        this.render();
        this.bindEvents();
        this.updateVersionDisplay();
        this.setupPinchZoom();
        this.setupFilters();
        
        // Force scroll container to have proper width on GitHub Pages
        if (this.scrollContainer) {
            this.scrollContainer.style.overflowX = 'scroll';
        }
        
        console.log('Timeline ready with', this.events.length, 'events');
    }
    
    updateVersionDisplay() {
        const versionEl = document.getElementById('version-info');
        if (versionEl) {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            versionEl.textContent = `🕒 Last update: ${dateStr} ${timeStr}`;
        }
    }
    
    getTotalWidth() {
        const totalYears = 30;
        const baseWidth = totalYears * this.zoom;
        // Add padding for the scroll bars and end markers
        return baseWidth + 200;
    }
    
    yearToPixel(year) {
        const totalYears = 30;
        const percent = (year - 1920) / totalYears;
        const totalWidth = totalYears * this.zoom;
        return 30 + (percent * totalWidth);
    }
    
    pixelToYear(pixelX) {
        const totalYears = 30;
        const totalWidth = totalYears * this.zoom;
        const percent = (pixelX - 30) / totalWidth;
        let year = 1920 + (percent * totalYears);
        year = Math.max(1920, Math.min(1950, year));
        return year;
    }
    
    getFallbackIcon(tags) {
        if (!tags || tags.length === 0) return '📄';
        
        const iconMap = {
            'Emergency Powers & Crisis Exploitation': '⚡',
            'Propaganda & Media Control': '📢',
            'Loyalty Purges & Political Patronage': '🗡️',
            'Electoral Manipulation & Democratic Erosion': '🗳️',
            'Legal Manipulation & Institutional Capture': '⚖️',
            'Authoritarian Ideology & Nationalism': '👑',
            'State-Sanctioned Violence & Intimidation': '💥',
            'Cult of Personality & Mass Mobilization': '👤',
            'Surveillance & Internal Policing': '👁️'
        };
        
        for (const tag of tags) {
            if (iconMap[tag]) return iconMap[tag];
        }
        return '📄';
    }
    
    render() {
        this.topTrack.innerHTML = '';
        this.bottomTrack.innerHTML = '';
        
        const totalWidth = this.getTotalWidth();
        
        // Update widths
        const inner = document.querySelector('.timeline-inner');
        if (inner) {
            inner.style.width = totalWidth + 'px';
        }
        if (this.topTrack) {
            this.topTrack.style.width = totalWidth + 'px';
        }
        if (this.bottomTrack) {
            this.bottomTrack.style.width = totalWidth + 'px';
        }
        
        // Year markers - top (1920-1950)
        const topContainer = document.getElementById('top-year-markers');
        topContainer.innerHTML = '';
        for (let y = 1920; y <= 1950; y += 5) {
            const left = this.yearToPixel(y);
            const label = document.createElement('span');
            label.className = 'year-marker-label';
            label.textContent = y;
            label.style.left = left + 'px';
            topContainer.appendChild(label);
        }
        
        // Year markers - bottom (2000-2030)
        const bottomContainer = document.getElementById('bottom-year-markers');
        bottomContainer.innerHTML = '';
        for (let y = 2000; y <= 2030; y += 5) {
            const percent = (y - 2000) / 30;
            const left = 30 + (percent * 30 * this.zoom);
            const label = document.createElement('span');
            label.className = 'year-marker-label';
            label.textContent = y;
            label.style.left = left + 'px';
            bottomContainer.appendChild(label);
        }
        
        // Group events by year
        const eventsByYear = {};
        this.events.forEach(event => {
            const key = `${event.position}_${event.year}`;
            if (!eventsByYear[key]) eventsByYear[key] = [];
            eventsByYear[key].push(event);
        });
        
        const zoomFactor = this.zoom / 70;
        const baseSpacing = 70;
        const extraSpacing = Math.max(0, (this.zoom - 70) * 0.25);
        const verticalSpacing = (baseSpacing + extraSpacing) * zoomFactor;
        
        this.events.forEach(event => {
            const key = `${event.position}_${event.year}`;
            const yearEvents = eventsByYear[key];
            const eventIndex = yearEvents.findIndex(e => e.id === event.id);
            const x = this.yearToPixel(event.year) + (eventIndex * 2);
            const y = 30 + (eventIndex * verticalSpacing);
            this.createCard(event, x, y);
        });
    }
    
    createCard(event, x, y) {
        const card = document.createElement('div');
        card.className = `timeline-card ${event.position}`;
        card.style.left = x + 'px';
        card.style.top = y + 'px';
        
        const date = new Date(event.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const yearDisplay = event.actualYear ? `${month} ${event.actualYear}` : `${month} ${date.getFullYear()}`;
        
        const fallbackIcon = this.getFallbackIcon(event.tags);
        
        let imageHtml = '';
        if (event.image && event.image !== '') {
            imageHtml = `<img class="card-image" src="${event.image}" alt="${event.title}" onerror="this.style.display='none'; this.parentElement.querySelector('.image-placeholder').style.display='flex';">`;
            imageHtml += `<div class="image-placeholder" style="display: none; height: 65px; background: #f5f5f5; border-radius: 6px; margin-bottom: 8px; align-items: center; justify-content: center; color: #999; font-size: 1.5rem;">${fallbackIcon}</div>`;
        } else {
            imageHtml = `<div class="image-placeholder" style="display: flex; height: 65px; background: #f5f5f5; border-radius: 6px; margin-bottom: 8px; align-items: center; justify-content: center; color: #999; font-size: 1.5rem;">${fallbackIcon}</div>`;
        }
        
        card.innerHTML = `
            ${imageHtml}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${yearDisplay}</div>
        `;
        
        card.onclick = (e) => {
            e.stopPropagation();
            this.modal.show(event);
        };
        
        if (event.position === 'top') {
            this.topTrack.appendChild(card);
        } else {
            this.bottomTrack.appendChild(card);
        }
    }
    
    getCenterYear() {
        if (!this.scrollContainer) return 1935;
        const centerX = this.scrollContainer.scrollLeft + (this.scrollContainer.clientWidth / 2);
        return this.pixelToYear(centerX);
    }
    
    setCenterYear(year) {
        if (!this.scrollContainer) return;
        const targetX = this.yearToPixel(year);
        const newScrollLeft = targetX - (this.scrollContainer.clientWidth / 2);
        this.scrollContainer.scrollLeft = Math.max(0, newScrollLeft);
    }
    
    zoomIn() { 
        const centerYear = this.getCenterYear();
        let newZoom = this.zoom * 1.2;
        if (newZoom <= this.maxZoom) {
            this.zoom = newZoom;
            this.render();
            this.setCenterYear(centerYear);
        }
    }
    
    zoomOut() { 
        const centerYear = this.getCenterYear();
        let newZoom = this.zoom * 0.8;
        if (newZoom >= this.minZoom) {
            this.zoom = newZoom;
            this.render();
            this.setCenterYear(centerYear);
        }
    }
    
    resetView() { 
        this.zoom = 70; 
        this.render(); 
        if (this.scrollContainer) {
            this.scrollContainer.scrollLeft = 0;
        }
    }
    
    fitToScreen() { 
        this.zoom = 70; 
        this.render(); 
        if (this.scrollContainer) {
            this.scrollContainer.scrollLeft = 0;
        }
    }
    
    filterEvents(tag) {
        this.activeFilter = tag;
        if (tag === 'all') {
            this.events = this.allEvents;
        } else {
            this.events = this.allEvents.filter(event => 
                event.tags && event.tags.includes(tag)
            );
        }
        this.render();
    }
    
    setupFilters() {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.onclick = () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tag = btn.getAttribute('data-tag');
                this.filterEvents(tag);
            };
        });
    }
    
    setupPinchZoom() {
        let initialZoom = this.zoom;
        let initialDistance = 0;
        let centerYear = 1935;
        
        const getDistance = (touches) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };
        
        const scrollContainer = this.scrollContainer;
        if (!scrollContainer) return;
        
        scrollContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                initialZoom = this.zoom;
                initialDistance = getDistance(e.touches);
                centerYear = this.getCenterYear();
            }
        });
        
        scrollContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const newDistance = getDistance(e.touches);
                const scale = newDistance / initialDistance;
                let newZoom = initialZoom * scale;
                newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
                
                if (Math.abs(newZoom - this.zoom) > 0.5) {
                    this.zoom = newZoom;
                    this.render();
                    this.setCenterYear(centerYear);
                }
            }
        });
    }
    
    bindEvents() {
        document.getElementById('zoom-in').onclick = () => this.zoomIn();
        document.getElementById('zoom-out').onclick = () => this.zoomOut();
        document.getElementById('reset-view').onclick = () => this.resetView();
        document.getElementById('fit-view').onclick = () => this.fitToScreen();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (typeof timelineEvents !== 'undefined' && typeof EventModal !== 'undefined') {
        const modal = new EventModal();
        window.timeline = new Timeline(timelineEvents, modal);
    } else {
        console.error('Required components not loaded');
    }
});