// Timeline Class - Separate from modal
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
        console.log('Timeline ready with', this.events.length, 'events');
    }
    
    yearToPixel(year) {
        const percent = (year - 1920) / 30;
        return 80 + (percent * 30 * this.zoom) + this.offset;
    }
    
    render() {
        this.topTrack.innerHTML = '';
        this.bottomTrack.innerHTML = '';
        
        // Year markers
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
        
        // Cards
        this.events.forEach(event => {
            const x = this.yearToPixel(event.year);
            const y = 30;
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
        
        card.innerHTML = `
            ${event.image ? `<img class="card-image" src="${event.image}" onerror="this.style.display='none'">` : '<div style="height:65px; background:#f5f5f5;"></div>'}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${yearDisplay}</div>
        `;
        card.onclick = () => this.modal.show(event);
        
        if (event.position === 'top') this.topTrack.appendChild(card);
        else this.bottomTrack.appendChild(card);
    }
    
    zoomIn() { this.zoom = Math.min(160, this.zoom * 1.2); this.render(); }
    zoomOut() { this.zoom = Math.max(35, this.zoom * 0.8); this.render(); }
    resetView() { this.zoom = 70; this.offset = 0; this.render(); }
    fitToScreen() { this.zoom = 70; this.offset = 0; this.render(); }
    
    bindEvents() {
        document.getElementById('zoom-in').onclick = () => this.zoomIn();
        document.getElementById('zoom-out').onclick = () => this.zoomOut();
        document.getElementById('reset-view').onclick = () => this.resetView();
        document.getElementById('fit-view').onclick = () => this.fitToScreen();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const modal = new EventModal();
    window.timeline = new Timeline(timelineEvents, modal);
});
