// ============================================
// COMPARATIVE TIMELINE - MAIN SCRIPT
// Fixed: Modal centering, Version on code change
// ============================================

class ComparativeTimeline {
    constructor() {
        this.events = timelineEvents;
        this.topStart = 1920;
        this.topEnd = 1950;
        this.bottomStart = 2000;
        this.bottomEnd = 2030;
        this.zoom = 70;
        this.offset = 0;
        this.minZoom = 35;
        this.maxZoom = 160;
        this.init();
    }

    init() {
        this.cacheElements();
        this.renderTimeline();
        this.bindEvents();
        this.setupModal();
        this.updateVersionDisplay();
        console.log('Timeline ready - Modal centered');
    }

    updateVersionDisplay() {
        const versionEl = document.getElementById('version-number');
        if (versionEl) {
            // Use a build timestamp from the script file's last modified time
            // This updates only when the file changes
            const buildTime = document.querySelector('script[src*="script.js"]')?.getAttribute('data-timestamp');
            if (buildTime) {
                versionEl.textContent = `Beta | ${buildTime}`;
            } else {
                // Fallback: manual version - change this number when you update code
                versionEl.textContent = `Beta | Build 2024.04.22-001`;
            }
        }
    }

    cacheElements() {
        this.topTrack = document.getElementById('top-timeline');
        this.bottomTrack = document.getElementById('bottom-timeline');
        this.modal = document.getElementById('event-modal');
        this.wrapper = document.querySelector('.timeline-wrapper');
        this.container = document.querySelector('.timeline-container');
    }

    getTotalWidth() {
        const totalYears = (this.topEnd - this.topStart);
        const width = totalYears * this.zoom + 200;
        return Math.max(width, this.wrapper ? this.wrapper.clientWidth : 1200);
    }

    updateInnerWidth() {
        const totalWidth = this.getTotalWidth();
        if (this.container) this.container.style.width = totalWidth + 'px';
        if (this.topTrack) this.topTrack.style.width = totalWidth + 'px';
        if (this.bottomTrack) this.bottomTrack.style.width = totalWidth + 'px';
        return totalWidth;
    }

    yearToPixel(year, position) {
        const start = 1920;
        const end = 1950;
        const percent = (year - start) / (end - start);
        const totalYears = (end - start);
        const width = totalYears * this.zoom;
        return 80 + (percent * width) + this.offset;
    }

    createYearMarkers() {
        const topContainer = document.getElementById('top-year-markers');
        if (topContainer) {
            topContainer.innerHTML = '';
            for (let y = this.topStart; y <= this.topEnd; y += 5) {
                const percent = (y - this.topStart) / (this.topEnd - this.topStart);
                const totalYears = (this.topEnd - this.topStart);
                const width = totalYears * this.zoom;
                const left = 80 + (percent * width) + this.offset;
                const label = document.createElement('span');
                label.className = 'year-marker-label';
                label.textContent = y;
                label.style.left = left + 'px';
                topContainer.appendChild(label);
            }
        }

        const bottomContainer = document.getElementById('bottom-year-markers');
        if (bottomContainer) {
            bottomContainer.innerHTML = '';
            for (let y = this.bottomStart; y <= this.bottomEnd; y += 5) {
                const relativePercent = (y - this.bottomStart) / (this.bottomEnd - this.bottomStart);
                const totalYears = (this.topEnd - this.topStart);
                const width = totalYears * this.zoom;
                const left = 80 + (relativePercent * width) + this.offset;
                const label = document.createElement('span');
                label.className = 'year-marker-label';
                label.textContent = y;
                label.style.left = left + 'px';
                bottomContainer.appendChild(label);
            }
        }
    }

    calculateVerticalPosition(eventsForYear, eventIndex) {
        const baseY = 20;
        const baseSpacing = 55;
        const zoomFactor = this.zoom / 70;
        const spacing = baseSpacing * Math.pow(zoomFactor, 1.2);
        return baseY + (eventIndex * spacing);
    }

    renderTimeline() {
        this.updateInnerWidth();
        if (this.topTrack) this.topTrack.innerHTML = '';
        if (this.bottomTrack) this.bottomTrack.innerHTML = '';

        const groupedEvents = {};
        this.events.forEach(event => {
            const key = `${event.position}_${event.year}`;
            if (!groupedEvents[key]) groupedEvents[key] = [];
            groupedEvents[key].push(event);
        });

        this.events.forEach(event => {
            const x = this.yearToPixel(event.year, event.position);
            const key = `${event.position}_${event.year}`;
            const eventsInYear = groupedEvents[key];
            const eventIndex = eventsInYear.findIndex(e => e.id === event.id);
            const y = this.calculateVerticalPosition(eventsInYear, eventIndex);
            this.createCard(event, x, y);
        });

        this.createYearMarkers();
    }

    createCard(event, x, y) {
        const card = document.createElement('div');
        card.className = `timeline-card ${event.position}`;
        card.style.left = x + 'px';
        card.style.top = y + 'px';
        
        const date = new Date(event.date);
        const yearOnly = date.getFullYear();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        
        let yearDisplay = `${month} ${yearOnly}`;
        if (event.position === 'bottom' && event.actualYear) {
            yearDisplay = `${month} ${event.actualYear}`;
        }
        
        const imageHtml = event.image && event.image !== "" 
            ? `<img class="card-image" src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.style.display='none';">`
            : `<div class="card-icon" style="font-size: 1.8rem; text-align: center;">${event.fallbackIcon || '📌'}</div>`;
        
        card.innerHTML = `
            ${imageHtml}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${yearDisplay}</div>
        `;
        
        card.onclick = (e) => {
            e.stopPropagation();
            this.showDetails(event);
        };
        
        if (event.position === 'top') {
            this.topTrack.appendChild(card);
        } else {
            this.bottomTrack.appendChild(card);
        }
    }

    showDetails(event) {
    // Get modal element
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    
    // Populate modal content
    document.getElementById('modal-title').textContent = event.title;
    
    const eventDate = new Date(event.date);
    const dateStr = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (event.position === 'bottom' && event.actualYear && event.actualYear !== event.year) {
        document.getElementById('modal-date').innerHTML = `${dateStr}<br><small>📌 Displayed at year ${event.year} (mapped to Hitler's timeline)</small>`;
    } else {
        document.getElementById('modal-date').textContent = dateStr;
    }
    
    document.getElementById('modal-description').textContent = event.description;
    
    const imageContainer = document.getElementById('modal-image-container');
    if (event.image && event.image !== '') {
        imageContainer.innerHTML = `<img class="modal-image" src="${event.image}" alt="${event.title}" onerror="this.parentElement.innerHTML='<div class=\'image-fallback\'><i class=\'fas fa-image\'></i><br>Image not available</div>'">`;
    } else {
        const icon = event.fallbackIcon || '📌';
        imageContainer.innerHTML = `<div class="image-fallback" style="font-size: 3rem; padding: 20px;">${icon}<br><span style="font-size: 0.8rem;">No image available</span></div>`;
    }
    
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    if (event.tags) {
        event.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            span.style.backgroundColor = this.getTagColor(tag);
            tagsContainer.appendChild(span);
        });
    }
    
    // CRITICAL: Clear any existing inline styles and set display correctly
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';
    
    // Ensure the modal content is centered
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.margin = '0';
        modalContent.style.position = 'relative';
    }
}
        
        // Simple modal display
        modal.style.display = 'flex';
    }

    getTagColor(tag) {
        const colors = {
            "Emergency Powers & Crisis Exploitation": "#B22222",
            "Propaganda & Media Control": "#1E90FF",
            "Judiciary & Legal Undermining": "#228B22",
            "State-Sanctioned Violence & Intimidation": "#FFD700",
            "Surveillance & Internal Policing": "#8A2BE2",
            "Loyalty Purges & Political Patronage": "#DC143C",
            "Electoral Manipulation & Democratic Erosion": "#2E8B57",
            "Cult of Personality & Mass Mobilization": "#FF8C00",
            "Authoritarian Ideology & Nationalism": "#FF6EDF",
            "Legal Manipulation & Institutional Capture": "#FF8CDE"
        };
        return colors[tag] || "#666";
    }

    setupModal() {
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                if (this.modal) this.modal.style.display = 'none';
            };
        }
        window.onclick = (e) => {
            if (e.target === this.modal) this.modal.style.display = 'none';
        };
    }

    zoomIn() {
        let newZoom = this.zoom * 1.25;
        if (newZoom <= this.maxZoom) {
            this.zoom = newZoom;
            this.renderTimeline();
        }
    }

    zoomOut() {
        let newZoom = this.zoom * 0.8;
        if (newZoom >= this.minZoom) {
            this.zoom = newZoom;
            this.renderTimeline();
        }
    }

    fitToScreen() {
        if (!this.wrapper) return;
        const visibleWidth = this.wrapper.clientWidth - 40;
        const currentWidth = (this.topEnd - this.topStart) * this.zoom;
        const targetZoom = (visibleWidth / currentWidth) * this.zoom;
        let newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, targetZoom));
        this.zoom = newZoom;
        this.offset = 0;
        this.renderTimeline();
        setTimeout(() => { if (this.wrapper) this.wrapper.scrollLeft = 0; }, 10);
    }

    resetView() {
        this.zoom = 70;
        this.offset = 0;
        this.renderTimeline();
        if (this.wrapper) this.wrapper.scrollLeft = 0;
    }

    bindEvents() {
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const resetBtn = document.getElementById('reset-view');
        const fitBtn = document.getElementById('fit-view');
        
        if (zoomInBtn) zoomInBtn.onclick = () => this.zoomIn();
        if (zoomOutBtn) zoomOutBtn.onclick = () => this.zoomOut();
        if (resetBtn) resetBtn.onclick = () => this.resetView();
        if (fitBtn) fitBtn.onclick = () => this.fitToScreen();
        
        let isDragging = false, dragStart = 0, startOffset = 0;
        const onDragStart = (e) => {
            if (e.touches && e.touches.length > 1) return;
            isDragging = true;
            dragStart = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            startOffset = this.offset;
            if (this.wrapper) this.wrapper.style.cursor = 'grabbing';
        };
        const onDrag = (e) => {
            if (!isDragging) return;
            const currentX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            const delta = currentX - dragStart;
            this.offset = startOffset + delta;
            this.renderTimeline();
        };
        const onDragEnd = () => {
            isDragging = false;
            if (this.wrapper) this.wrapper.style.cursor = 'default';
        };
        
        if (this.wrapper) {
            this.wrapper.addEventListener('mousedown', onDragStart);
            this.wrapper.addEventListener('touchstart', onDragStart, { passive: false });
        }
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('touchmove', onDrag, { passive: false });
        window.addEventListener('touchend', onDragEnd);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.timeline = new ComparativeTimeline();
});
