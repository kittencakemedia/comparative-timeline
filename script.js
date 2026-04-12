// Main Timeline Class
class ComparativeTimeline {
    constructor() {
        this.events = timelineEvents;
        this.topStart = 1920; this.topEnd = 1950;
        this.bottomStart = 2000; this.bottomEnd = 2030;
        this.zoom = 70;
        this.offset = 0;
        this.minZoom = 35;
        this.maxZoom = 160;
        this.version = "1.0.0-beta";
        this.buildDate = "2026-04-12";
        this.init();
    }

    init() {
        this.cacheElements();
        this.createYearMarkers();
        this.renderTimeline();
        this.bindEvents();
        this.setupModal();
        this.setupPinchZoom();
        this.updateVersionDisplay();
        console.log('Timeline ready - v' + this.version);
    }

    cacheElements() {
        this.topTrack = document.getElementById('top-timeline');
        this.bottomTrack = document.getElementById('bottom-timeline');
        this.modal = document.getElementById('event-modal');
        this.container = document.getElementById('timeline-container');
        this.inner = document.getElementById('timeline-inner');
    }

    updateVersionDisplay() {
        const versionEl = document.getElementById('version-number');
        if (versionEl) {
            versionEl.textContent = `v${this.version} | ${this.buildDate}`;
        }
    }

    getTotalWidth() {
        const totalYears = (this.topEnd - this.topStart);
        const width = totalYears * this.zoom + 160;
        return Math.max(width, this.container.clientWidth);
    }

    updateInnerWidth() {
        const totalWidth = this.getTotalWidth();
        this.inner.style.width = totalWidth + 'px';
        this.topTrack.style.width = totalWidth + 'px';
        this.bottomTrack.style.width = totalWidth + 'px';
        return totalWidth;
    }

    yearToPixel(year, position) {
        const start = position === 'top' ? this.topStart : this.bottomStart;
        const end = position === 'top' ? this.topEnd : this.bottomEnd;
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
            for (let y = this.bottomStart; y <= this.bottomEnd; y += 5) {
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
        const baseY = 30;
        const baseSpacing = 35;
        const zoomFactor = this.zoom / 70;
        const spacing = baseSpacing * Math.pow(zoomFactor, 1.2);
        return baseY + (eventIndex * spacing);
    }

    renderTimeline() {
        this.updateInnerWidth();
        this.topTrack.innerHTML = '';
        this.bottomTrack.innerHTML = '';

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
        
        card.innerHTML = `
            <div class="card-icon"><i class="fas fa-${event.type === 'circle' ? 'circle' : 'square'}"></i></div>
            ${event.image ? `<img class="card-image" src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.style.display='none'">` : ''}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${month} ${yearOnly}</div>
        `;
        
        card.onclick = () => this.showDetails(event);
        
        if (event.position === 'top') this.topTrack.appendChild(card);
        else this.bottomTrack.appendChild(card);
    }

    showDetails(event) {
        document.getElementById('modal-title').textContent = event.title;
        document.getElementById('modal-date').textContent = new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('modal-description').textContent = event.description;
        
        const imageContainer = document.getElementById('modal-image-container');
        if (event.image && event.image !== '') {
            imageContainer.innerHTML = `<img class="modal-image" src="${event.image}" alt="${event.title}" onerror="this.parentElement.innerHTML='<div class=\'image-fallback\'><i class=\'fas fa-image\'></i><br>Image not available</div>'">`;
        } else {
            imageContainer.innerHTML = '<div class="image-fallback"><i class="fas fa-image"></i><br>No image available</div>';
        }
        
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        event.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            span.style.backgroundColor = TAG_COLORS[tag] || '#666';
            tagsContainer.appendChild(span);
        });
        
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
            const containerRect = this.container.getBoundingClientRect();
            const centerX = containerRect.left + containerRect.width / 2;
            this.zoom = newZoom;
            this.renderTimeline();
            const newContainerRect = this.container.getBoundingClientRect();
            const newCenterX = newContainerRect.left + newContainerRect.width / 2;
            this.offset += (centerX - newCenterX) * 0.5;
            this.renderTimeline();
        }
    }

    zoomOut() {
        let newZoom = this.zoom * 0.8;
        if (newZoom >= this.minZoom) {
            const containerRect = this.container.getBoundingClientRect();
            const centerX = containerRect.left + containerRect.width / 2;
            this.zoom = newZoom;
            this.renderTimeline();
            const newContainerRect = this.container.getBoundingClientRect();
            const newCenterX = newContainerRect.left + newContainerRect.width / 2;
            this.offset += (centerX - newCenterX) * 0.5;
            this.renderTimeline();
        }
    }

    fitToScreen() {
        const visibleWidth = this.container.clientWidth - 40;
        const currentWidth = (this.topEnd - this.topStart) * this.zoom;
        const targetZoom = (visibleWidth / currentWidth) * this.zoom;
        let newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, targetZoom));
        this.zoom = newZoom;
        this.offset = 0;
        this.renderTimeline();
        setTimeout(() => { this.container.scrollLeft = 0; }, 10);
    }

    resetView() {
        this.zoom = 70;
        this.offset = 0;
        this.renderTimeline();
        if (this.container) this.container.scrollLeft = 0;
    }

    setupPinchZoom() {
        let initialPinchDistance = 0;
        let initialZoom = this.zoom;
        let initialOffset = this.offset;
        
        const getPinchDistance = (touches) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };
        
        const getPinchCenter = (touches) => {
            return {
                x: (touches[0].clientX + touches[1].clientX) / 2,
                y: (touches[0].clientY + touches[1].clientY) / 2
            };
        };
        
        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                initialPinchDistance = getPinchDistance(e.touches);
                initialZoom = this.zoom;
                initialOffset = this.offset;
            }
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const newDistance = getPinchDistance(e.touches);
                const center = getPinchCenter(e.touches);
                const scale = newDistance / initialPinchDistance;
                let newZoom = initialZoom * scale;
                newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
                
                if (newZoom !== this.zoom) {
                    const zoomRatio = newZoom / this.zoom;
                    const containerRect = this.container.getBoundingClientRect();
                    const relativeX = (center.x - containerRect.left + this.container.scrollLeft) / this.getTotalWidth();
                    this.zoom = newZoom;
                    this.renderTimeline();
                    const newTotalWidth = this.getTotalWidth();
                    const newScrollX = relativeX * newTotalWidth - (center.x - containerRect.left);
                    this.container.scrollLeft = newScrollX;
                }
            }
        });
    }

    bindEvents() {
        document.getElementById('zoom-in').onclick = () => this.zoomIn();
        document.getElementById('zoom-out').onclick = () => this.zoomOut();
        document.getElementById('reset-view').onclick = () => this.resetView();
        document.getElementById('fit-view').onclick = () => this.fitToScreen();
        
        let isDragging = false, dragStart = 0, startOffset = 0;
        const onDragStart = (e) => {
            if (e.touches && e.touches.length > 1) return;
            isDragging = true;
            dragStart = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            startOffset = this.offset;
            document.body.style.cursor = 'grabbing';
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
            document.body.style.cursor = 'default';
        };
        
        if (this.topTrack) {
            this.topTrack.addEventListener('mousedown', onDragStart);
            this.topTrack.addEventListener('touchstart', onDragStart, { passive: false });
        }
        if (this.bottomTrack) {
            this.bottomTrack.addEventListener('mousedown', onDragStart);
            this.bottomTrack.addEventListener('touchstart', onDragStart, { passive: false });
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
