// Timeline Class
class Timeline {
    constructor(events, modal) {
        this.events = events;
        this.modal = modal;
        this.zoom = 70;
        this.offset = 0;
        this.init();
    }

    init() {
        this.topTrack = document.getElementById('top-timeline');
        this.bottomTrack = document.getElementById('bottom-timeline');
        this.render();
        this.bindEvents();
        this.updateVersion();
        this.setupPinchZoom();  // ADD THIS LINE
        console.log('Timeline ready with', this.events.length, 'events');
    }

    updateVersion() {
        const versionEl = document.getElementById('version-number');
        if (versionEl) {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            versionEl.textContent = `Beta | ${dateStr} ${timeStr}`;
        }
    }

    yearToPixel(year) {
        const totalYears = 30;
        const percent = (year - 1920) / totalYears;
        const totalWidth = totalYears * this.zoom;
        return 80 + (percent * totalWidth) + this.offset;
    }

    render() {
        // Clear tracks
        this.topTrack.innerHTML = '';
        this.bottomTrack.innerHTML = '';

        // Year markers - top
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

        // Year markers - bottom
        const bottomContainer = document.getElementById('bottom-year-markers');
        bottomContainer.innerHTML = '';
        for (let y = 2000; y <= 2030; y += 5) {
            const percent = (y - 2000) / 30;
            const left = 80 + (percent * 30 * this.zoom) + this.offset;
            const label = document.createElement('span');
            label.className = 'year-marker-label';
            label.textContent = y;
            label.style.left = left + 'px';
            bottomContainer.appendChild(label);
        }

        // Group events by year for stacking
        const eventsByYear = {};
        this.events.forEach(event => {
            const key = `${event.position}_${event.year}`;
            if (!eventsByYear[key]) eventsByYear[key] = [];
            eventsByYear[key].push(event);
        });

        // Calculate zoom factor and spacing
        const zoomFactor = this.zoom / 70;
        const baseSpacing = 70;  // Slightly larger base
        // Add extra spacing at higher zoom levels
        const extraSpacing = Math.max(0, (this.zoom - 70) * 0.25);
        const verticalSpacing = (baseSpacing + extraSpacing) * zoomFactor;
        console.log(`Rendering: zoom=${this.zoom}, spacing=${verticalSpacing.toFixed(1)}px`);

        // Render cards
        this.events.forEach(event => {
            const x = this.yearToPixel(event.year);
            const key = `${event.position}_${event.year}`;
            const yearEvents = eventsByYear[key];
            const eventIndex = yearEvents.findIndex(e => e.id === event.id);
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

        // Determine if image exists
        let imageHtml = '';
        if (event.image && event.image !== '') {
            imageHtml = `<img class="card-image" src="${event.image}" onerror="this.style.display='none'; this.parentElement.querySelector('.image-placeholder').style.display='flex';">`;
            imageHtml += `<div class="image-placeholder" style="display: none; height: 65px; background: #f5f5f5; border-radius: 6px; margin-bottom: 8px; align-items: center; justify-content: center; color: #999;">📷</div>`;
        } else {
            imageHtml = `<div class="image-placeholder" style="display: flex; height: 65px; background: #f5f5f5; border-radius: 6px; margin-bottom: 8px; align-items: center; justify-content: center; color: #999;">📷</div>`;
        }

        card.innerHTML = `
        ${imageHtml}
        <div class="card-title">${event.title}</div>
        <div class="card-year">${yearDisplay}</div>
    `;

        card.onclick = () => this.modal.show(event);

        if (event.position === 'top') {
            this.topTrack.appendChild(card);
        } else {
            this.bottomTrack.appendChild(card);
        }
    }

    zoomIn() {
        let newZoom = this.zoom * 1.2;
        if (newZoom <= 160) {
            // Store the center of the viewport before zoom
            const container = document.querySelector('.timeline-container');
            const viewportCenter = container.scrollLeft + (container.clientWidth / 2);
            const centerYear = this.pixelToYear(viewportCenter);

            this.zoom = newZoom;
            this.render();

            // Restore center position after zoom
            const newCenterX = this.yearToPixel(centerYear);
            container.scrollLeft = newCenterX - (container.clientWidth / 2);
        }
    }

    zoomOut() {
        let newZoom = this.zoom * 0.8;
        if (newZoom >= 35) {
            const container = document.querySelector('.timeline-container');
            const viewportCenter = container.scrollLeft + (container.clientWidth / 2);
            const centerYear = this.pixelToYear(viewportCenter);

            this.zoom = newZoom;
            this.render();

            const newCenterX = this.yearToPixel(centerYear);
            container.scrollLeft = newCenterX - (container.clientWidth / 2);
        }
    }
    pixelToYear(pixelX) {
        const totalYears = 30;
        const totalWidth = totalYears * this.zoom;
        const percent = (pixelX - 80 - this.offset) / totalWidth;
        let year = 1920 + (percent * totalYears);
        year = Math.max(1920, Math.min(1950, year));
        return year;
    }
    resetView() {
        this.zoom = 70;
        this.offset = 0;
        console.log('Reset view - zoom:', this.zoom);
        this.render();
    }

    fitToScreen() {
        this.zoom = 70;
        this.offset = 0;
        this.render();
    }

    bindEvents() {
        document.getElementById('zoom-in').onclick = () => this.zoomIn();
        document.getElementById('zoom-out').onclick = () => this.zoomOut();
        document.getElementById('reset-view').onclick = () => this.resetView();
        document.getElementById('fit-view').onclick = () => this.fitToScreen();
    }

    setupPinchZoom() {
        let initialZoom = this.zoom;
        let initialDistance = 0;
        let centerYear = 1935; // Default center

        const getDistance = (touches) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const container = document.querySelector('.timeline-container');
        if (!container) return;

        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialZoom = this.zoom;
                initialDistance = getDistance(e.touches);
                // Store center year at pinch start
                const viewportCenter = container.scrollLeft + (container.clientWidth / 2);
                centerYear = this.pixelToYear(viewportCenter);
            }
        });

        container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const newDistance = getDistance(e.touches);
                const scale = newDistance / initialDistance;
                let newZoom = initialZoom * scale;
                newZoom = Math.max(35, Math.min(160, newZoom));

                if (Math.abs(newZoom - this.zoom) > 1) {
                    this.zoom = newZoom;
                    this.render();

                    // Restore center position
                    const newCenterX = this.yearToPixel(centerYear);
                    container.scrollLeft = newCenterX - (container.clientWidth / 2);
                }
            }
        });
    }

    getTotalWidth() {
        const totalYears = 30;
        const totalWidth = totalYears * this.zoom;
        return totalWidth + 160; // Add padding
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