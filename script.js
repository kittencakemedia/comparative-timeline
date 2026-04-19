// ============================================
// COMPARATIVE TIMELINE - MAIN SCRIPT
// Updated to support mapped year display
// ============================================

// Timeline Class
class ComparativeTimeline {
    constructor() {
        this.events = timelineEvents;
        this.topStart = 1920; this.topEnd = 1950;
        this.bottomStart = 1920; this.bottomEnd = 1950;  // Trump uses Hitler's years for display
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
        this.logDataQuality();
        console.log('Timeline ready - Using mapped year display');
    }

    logDataQuality() {
        const eventsWithImages = this.events.filter(e => e.image && e.image !== "");
        const placeholders = this.events.filter(e => e.isPlaceholder);
        console.log(`📊 Data Quality:`);
        console.log(`   Total events: ${this.events.length}`);
        console.log(`   Events with images: ${eventsWithImages.length}`);
        console.log(`   Placeholders: ${placeholders.length}`);
        if (placeholders.length > 0) {
            console.log(`   ⚠️ Placeholders need replacement: ${placeholders.map(p => p.id).join(', ')}`);
        }
    }

    cacheElements() {
        this.topTrack = document.getElementById('top-timeline');
        this.bottomTrack = document.getElementById('bottom-timeline');
        this.modal = document.getElementById('event-modal');
        this.container = document.getElementById('timeline-container');
        this.inner = document.getElementById('timeline-inner');
    }

    getTotalWidth() {
        const totalYears = (this.topEnd - this.topStart);
        const width = totalYears * this.zoom + 200;
        return Math.max(width, this.container.clientWidth);
    }

    updateInnerWidth() {
        const totalWidth = this.getTotalWidth();
        if (this.inner) this.inner.style.width = totalWidth + 'px';
        if (this.topTrack) this.topTrack.style.width = totalWidth + 'px';
        if (this.bottomTrack) this.bottomTrack.style.width = totalWidth + 'px';
        return totalWidth;
    }

    // Use the event's 'year' field for positioning (Hitler's year for mapped events)
    yearToPixel(year, position) {
        // Both top and bottom now use the same 1920-1950 range for display
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
            for (let y = 1920; y <= 1950; y += 5) {
                const left = this.yearToPixel(y, 'top');
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
            for (let y = 1920; y <= 1950; y += 5) {
                const left = this.yearToPixel(y, 'bottom');
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

        // Group events by year for stacking
        const groupedEvents = {};
        this.events.forEach(event => {
            // Use 'year' field for positioning (already mapped to Hitler's year for Trump)
            const key = `${event.position}_${event.year}`;
            if (!groupedEvents[key]) groupedEvents[key] = [];
            groupedEvents[key].push(event);
        });

        // Render events
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

    getDisplayImage(event) {
        if (event.image && event.image !== "") {
            return event.image;
        }
        // Use fallback icon as data URI if no image
        const icon = event.fallbackIcon || "📌";
        return null;  // Will trigger fallback display
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
        
        // Show actual year for Trump events if different from display year
        let yearDisplay = `${month} ${yearOnly}`;
        if (event.actualYear && event.actualYear !== event.year) {
            yearDisplay = `${month} ${yearOnly} (Mapped to ${event.year})`;
        }
        
        // Handle image or fallback
        const imageHtml = event.image && event.image !== "" 
            ? `<img class="card-image" src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.style.display='none'; this.parentElement.querySelector('.card-icon').style.fontSize='1.5rem';">`
            : `<div class="card-icon" style="font-size: 1.8rem; text-align: center;">${event.fallbackIcon || '📌'}</div>`;
        
        card.innerHTML = `
            ${imageHtml}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${yearDisplay}</div>
        `;
        
        card.onclick = () => this.showDetails(event);
        
        if (event.position === 'top') {
            this.topTrack.appendChild(card);
        } else {
            this.bottomTrack.appendChild(card);
        }
    }

    showDetails(event) {
        document.getElementById('modal-title').textContent = event.title;
        
        // Show date information including mapping if applicable
        const eventDate = new Date(event.date);
        const dateStr = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        if (event.actualYear && event.actualYear !== event.year) {
            document.getElementById('modal-date').innerHTML = `${dateStr}<br><small>📌 Displayed at year ${event.year} (mapped to Hitler's timeline)</small>`;
        } else {
            document.getElementById('modal-date').textContent = dateStr;
        }
        
        document.getElementById('modal-description').textContent = event.description;
        
        // Handle image display in modal
        const imageContainer = document.getElementById('modal-image-container');
        if (event.image && event.image !== '') {
            imageContainer.innerHTML = `<img class="modal-image" src="${event.image}" alt="${event.title}" onerror="this.parentElement.innerHTML='<div class=\'image-fallback\'><i class=\'fas fa-image\'></i><br>Image not available</div>'">`;
        } else {
            const icon = event.fallbackIcon || '📌';
            imageContainer.innerHTML = `<div class="image-fallback" style="font-size: 3rem; padding: 20px;">${icon}<br><span style="font-size: 0.8rem;">No image available</span></div>`;
        }
        
        // Handle tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        if (event.tags) {
            event.tags.forEach(tag => {
                const tagDef = TAG_DEFINITIONS ? Object.values(TAG_DEFINITIONS).find(t => t.name === tag) : null;
                const color = tagDef ? tagDef.color : '#666';
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                span.style.backgroundColor = color;
                tagsContainer.appendChild(span);
            });
        }
        
        this.modal.style.display = 'flex';
    }

    setupModal() {
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) closeBtn.onclick = () => this.modal.style.display = 'none';
        window.onclick = (e) => { if (e.target === this.modal) this.modal.style.display = 'none'; };
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
        if (!this.container) return;
        const visibleWidth = this.container.clientWidth - 40;
        const currentWidth = (1950 - 1920) * this.zoom;
        const targetZoom = (visibleWidth / currentWidth) * this.zoom;
        let newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, targetZoom));
        this.zoom = newZoom;
        this.offset = 0;
        this.renderTimeline();
        setTimeout(() => { if (this.container) this.container.scrollLeft = 0; }, 10);
    }

    resetView() {
        this.zoom = 70;
        this.offset = 0;
        this.renderTimeline();
        if (this.container) this.container.scrollLeft = 0;
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
        
        // Drag to pan
        let isDragging = false, dragStart = 0, startOffset = 0;
        const onDragStart = (e) => {
            if (e.touches && e.touches.length > 1) return;
            isDragging = true;
            dragStart = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            startOffset = this.offset;
            if (this.container) this.container.style.cursor = 'grabbing';
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
            if (this.container) this.container.style.cursor = 'default';
        };
        
        if (this.container) {
            this.container.addEventListener('mousedown', onDragStart);
            this.container.addEventListener('touchstart', onDragStart, { passive: false });
        }
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('touchmove', onDrag, { passive: false });
        window.addEventListener('touchend', onDragEnd);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.timeline = new ComparativeTimeline();
});
