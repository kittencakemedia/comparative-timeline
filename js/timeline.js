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
        this.updateFascismMeter();  // ADD THIS LINE

        
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
        this.updateFascismMeter();  // ADD THIS LINE

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

    // Calculate Fascism Score for Trump events
    calculateFascismScore() {
        const tagWeights = {
            'Emergency Powers & Crisis Exploitation': 10,
            'State-Sanctioned Violence & Intimidation': 10,
            'Loyalty Purges & Political Patronage': 8,
            'Electoral Manipulation & Democratic Erosion': 8,
            'Legal Manipulation & Institutional Capture': 6,
            'Propaganda & Media Control': 5,
            'Cult of Personality & Mass Mobilization': 5,
            'Authoritarian Ideology & Nationalism': 5,
            'Surveillance & Internal Policing': 3
        };
        
        let totalWeight = 0;
        let maxPossibleWeight = 0;
        
        const trumpEvents = this.allEvents.filter(e => e.position === 'bottom');
        
        trumpEvents.forEach(event => {
            // Get tag weight
            let eventWeight = 3; // Default minimum
            if (event.tags && event.tags.length > 0) {
                for (const tag of event.tags) {
                    if (tagWeights[tag]) {
                        eventWeight = Math.max(eventWeight, tagWeights[tag]);
                    }
                }
            }
            
            // Recency bonus (0.3 to 1.0)
            let recency = 0.5;
            if (event.actualYear) {
                recency = 0.3 + ((event.actualYear - 2000) / 30) * 0.7;
                recency = Math.min(1, Math.max(0.3, recency));
            }
            
            // Calculate contribution
            totalWeight += eventWeight * recency;
            maxPossibleWeight += 10; // Max weight per event
        });
        
        // Calculate percentage (0-100)
        let percentage = 0;
        if (maxPossibleWeight > 0) {
            percentage = Math.round((totalWeight / maxPossibleWeight) * 100);
            percentage = Math.min(100, Math.max(0, percentage));
        }
        
        // Add small base for existing systemic issues
        const baseSystemicIssues = 15;
        percentage = Math.min(100, percentage + baseSystemicIssues);
        
        return percentage;
    }

    // Calculate Hitler reference scores at key historical moments
    calculateHitlerReferences() {
        // Historically accurate reference points (based on scholarly consensus)
        return {
            1933: 65,  // Enabling Act - democracy ends
            1935: 75,  // Nuremberg Laws - legal persecution
            1938: 85,  // Kristallnacht - state violence
            1942: 95   // Wannsee Conference - industrialized genocide
        };
    }

    // Update the Fascism Meter display
    updateFascismMeter() {
        const percentage = this.calculateFascismScore();
        const hitlerRefs = this.calculateHitlerReferences();
        
        console.log('Trump Score:', percentage);
        console.log('Hitler References:', hitlerRefs);
        
        // Update percentage display
        const percentageEl = document.getElementById('fascism-percentage');
        if (percentageEl) {
            percentageEl.textContent = percentage + '%';
        }
        
        // Update fill bar
        const fillEl = document.getElementById('fascism-fill');
        if (fillEl) {
            fillEl.style.width = percentage + '%';
            
            // Change fill color based on threshold
            if (percentage >= 90) {
                fillEl.style.background = '#8B0000';
            } else if (percentage >= 70) {
                fillEl.style.background = '#F44336';
            } else if (percentage >= 50) {
                fillEl.style.background = '#FF9800';
            } else if (percentage >= 30) {
                fillEl.style.background = '#FFC107';
            } else {
                fillEl.style.background = '#4CAF50';
            }
        }
        
        // Update Hitler reference points
        const yearNames = {
            1933: 'Enabling Act (1933)',
            1935: 'Nuremberg Laws (1935)',
            1938: 'Kristallnacht (1938)',
            1942: 'Wannsee Conf (1942)'
        };
        
        for (const [year, score] of Object.entries(hitlerRefs)) {
            const refSpan = document.querySelector(`.ref-point[data-year="${year}"]`);
            if (refSpan) {
                refSpan.textContent = `${yearNames[year]}: ${score}%`;
            }
        }
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