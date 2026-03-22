// Tag definitions
const TAG_DEFINITIONS = {
    1: { id: 1, name: "Emergency Powers & Crisis Exploitation", color: "#B22222" },
    2: { id: 2, name: "Propaganda & Media Control", color: "#1E90FF" },
    3: { id: 3, name: "Judiciary & Legal Undermining", color: "#228B22" },
    4: { id: 4, name: "State-Sanctioned Violence & Intimidation", color: "#FFD700" },
    5: { id: 5, name: "Surveillance & Internal Policing", color: "#8A2BE2" },
    6: { id: 6, name: "Loyalty Purges & Political Patronage", color: "#DC143C" },
    7: { id: 7, name: "Electoral Manipulation & Democratic Erosion", color: "#2E8B57" },
    8: { id: 8, name: "Cult of Personality & Mass Mobilization", color: "#FF8C00" },
    9: { id: 9, name: "Authoritarian Ideology & Nationalism", color: "#FF6EDF" },
    10: { id: 10, name: "Legal Manipulation & Institutional Capture", color: "#FF8CDE" }
};

const TYPE_ICONS = {
    'circle': 'fas fa-circle',
    'rect': 'fas fa-square',
    'smallrect': 'fas fa-square',
    'bigrect': 'fas fa-square',
    'diamond': 'fas fa-gem',
    'vertical_rect': 'fas fa-columns',
    'vertical_dot': 'fas fa-ellipsis-v',
    'default': 'fas fa-flag'
};

// Timeline configuration
const TIMELINE_CONFIG = {
    topEra: { start: 1920, end: 1950, label: "Person A Era (1920-1950)" },
    bottomEra: { start: 2000, end: 2030, label: "Person B Era (2000-2030)" },
    pixelsPerYear: 60,
    minZoom: 30,
    maxZoom: 120
};

// Main Timeline Class
class ComparativeTimeline {
    constructor() {
        this.events = timelineEvents;
        this.config = TIMELINE_CONFIG;
        this.currentZoom = this.config.pixelsPerYear;
        this.currentOffset = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartOffset = 0;
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupModal();
        this.renderTimeline();
        this.createYearMarkers();
        this.bindEvents();
        console.log('Timeline initialized with', this.events.length, 'events');
    }
    
    cacheElements() {
        this.topTimeline = document.getElementById('top-timeline');
        this.bottomTimeline = document.getElementById('bottom-timeline');
        this.modal = document.getElementById('event-modal');
        this.closeModal = document.querySelector('.close-modal');
    }
    
    yearToPixel(year, position) {
        const era = position === 'top' ? this.config.topEra : this.config.bottomEra;
        const relativePosition = (year - era.start) / (era.end - era.start);
        const totalWidth = (era.end - era.start) * this.currentZoom;
        return 100 + (relativePosition * totalWidth) + this.currentOffset;
    }
    
    calculateCardPositions(events, position) {
        const placedCards = [];
        const verticalSpacing = 100;
        
        // Group by year
        const eventsByYear = {};
        events.forEach(event => {
            if (!eventsByYear[event.year]) eventsByYear[event.year] = [];
            eventsByYear[event.year].push(event);
        });
        
        // Process each year
        Object.keys(eventsByYear).sort().forEach(year => {
            const yearEvents = eventsByYear[year];
            const baseX = this.yearToPixel(parseInt(year), position);
            
            yearEvents.forEach((event, index) => {
                const x = baseX + (index * 12);
                const y = 20 + (index * verticalSpacing);
                
                placedCards.push({
                    event: event,
                    x: x,
                    y: y,
                    lane: index,
                    year: event.year
                });
            });
        });
        
        return placedCards;
    }
    
    renderTimeline() {
        // Clear tracks
        if (this.topTimeline) this.topTimeline.innerHTML = '';
        if (this.bottomTimeline) this.bottomTimeline.innerHTML = '';
        
        // Clear year markers
        document.querySelectorAll('.year-marker, .year-label').forEach(el => el.remove());
        
        // Get events
        const topEvents = this.events.filter(e => e.position === 'top');
        const bottomEvents = this.events.filter(e => e.position === 'bottom');
        
        // Calculate and create cards
        const topCards = this.calculateCardPositions(topEvents, 'top');
        const bottomCards = this.calculateCardPositions(bottomEvents, 'bottom');
        
        topCards.forEach(card => this.createCard(card.event, card.x, card.y));
        bottomCards.forEach(card => this.createCard(card.event, card.x, card.y));
        
        // Recreate year markers
        this.createYearMarkers();
    }
    
    // NOTE: Method is called "createCard" not "createEventCard"
    createCard(event, x, y) {
        const card = document.createElement('div');
        card.className = `timeline-card ${event.position}`;
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
        card.dataset.id = event.id;
        
        const iconClass = TYPE_ICONS[event.type] || TYPE_ICONS.default;
        const displayDate = this.formatDate(event.date);
        
        card.innerHTML = `
            <div class="card-icon">
                <i class="${iconClass}"></i>
            </div>
            ${event.image ? `<img class="card-image" src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.style.display='none'">` : ''}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${displayDate}</div>
        `;
        
        card.onclick = (e) => {
            e.stopPropagation();
            this.showEventDetails(event);
        };
        
        if (event.position === 'top') {
            this.topTimeline.appendChild(card);
        } else {
            this.bottomTimeline.appendChild(card);
        }
        
        console.log(`Created card: ${event.title} at (${x}, ${y})`);
    }
    
    createYearMarkers() {
        this.createMarkersForEra('top', this.config.topEra);
        this.createMarkersForEra('bottom', this.config.bottomEra);
    }
    
    createMarkersForEra(position, era) {
        const container = position === 'top' ? 
            document.querySelector('.top-section') : 
            document.querySelector('.bottom-section');
        
        if (!container) return;
        
        for (let year = era.start; year <= era.end; year += 5) {
            const pixelX = this.yearToPixel(year, position);
            
            const marker = document.createElement('div');
            marker.className = 'year-marker';
            marker.style.left = `${pixelX}px`;
            
            const label = document.createElement('div');
            label.className = `year-label ${position}-label`;
            label.textContent = year;
            label.style.left = `${pixelX}px`;
            
            container.appendChild(marker);
            container.appendChild(label);
        }
    }
    
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    
    showEventDetails(event) {
        const modal = document.getElementById('event-modal');
        if (!modal) return;
        
        const titleEl = document.getElementById('modal-title');
        const dateEl = document.getElementById('modal-date');
        const descEl = document.getElementById('modal-description');
        const typeEl = document.getElementById('modal-type');
        const positionEl = document.getElementById('modal-position');
        const modalImage = document.getElementById('modal-image');
        const fallback = document.getElementById('image-fallback');
        const tagsContainer = document.getElementById('modal-tags');
        const videoContainer = document.getElementById('modal-video-container');
        const videoLink = document.getElementById('video-link');
        
        if (titleEl) titleEl.textContent = event.title;
        if (dateEl) dateEl.textContent = this.formatDate(event.date);
        if (descEl) descEl.textContent = event.description;
        if (typeEl) typeEl.textContent = event.type;
        if (positionEl) positionEl.textContent = event.position === 'top' ? 'Person A' : 'Person B';
        
        // Image handling
        if (modalImage && fallback) {
            if (event.image) {
                modalImage.src = event.image;
                modalImage.style.display = 'block';
                fallback.style.display = 'none';
            } else {
                modalImage.style.display = 'none';
                fallback.style.display = 'flex';
            }
        }
        
        // Video handling
        if (videoContainer && videoLink) {
            if (event.video) {
                videoContainer.style.display = 'block';
                videoLink.href = event.video;
            } else {
                videoContainer.style.display = 'none';
            }
        }
        
        // Tags
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            if (event.tags) {
                event.tags.forEach(tagId => {
                    const tag = TAG_DEFINITIONS[tagId];
                    if (tag) {
                        const span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = tag.name;
                        span.style.backgroundColor = tag.color;
                        tagsContainer.appendChild(span);
                    }
                });
            }
        }
        
        modal.style.display = 'block';
    }
    
    setupModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            if (this.closeModal) {
                this.closeModal.onclick = () => { this.modal.style.display = 'none'; };
            }
            window.onclick = (e) => { 
                if (e.target === this.modal) this.modal.style.display = 'none'; 
            };
        }
    }
    
    zoom(factor) {
        const newZoom = this.currentZoom * factor;
        if (newZoom >= this.config.minZoom && newZoom <= this.config.maxZoom) {
            this.currentZoom = newZoom;
            this.renderTimeline();
        }
    }
    
    resetView() {
        this.currentZoom = this.config.pixelsPerYear;
        this.currentOffset = 0;
        this.renderTimeline();
    }
    
    bindEvents() {
        const zoomIn = document.getElementById('zoom-in');
        const zoomOut = document.getElementById('zoom-out');
        const reset = document.getElementById('reset-view');
        
        if (zoomIn) zoomIn.onclick = () => this.zoom(1.2);
        if (zoomOut) zoomOut.onclick = () => this.zoom(0.8);
        if (reset) reset.onclick = () => this.resetView();
        
        // Drag events
        const tracks = [this.topTimeline, this.bottomTimeline];
        tracks.forEach(track => {
            if (!track) return;
            track.onmousedown = (e) => this.startDrag(e);
        });
        
        window.onmousemove = (e) => this.drag(e);
        window.onmouseup = () => this.stopDrag();
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.dragStartX = e.clientX;
        this.dragStartOffset = this.currentOffset;
    }
    
    drag(e) {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.dragStartX;
        this.currentOffset = this.dragStartOffset + deltaX;
        this.renderTimeline();
    }
    
    stopDrag() {
        this.isDragging = false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.timeline = new ComparativeTimeline();
    console.log('Timeline initialized and available as window.timeline');
});
