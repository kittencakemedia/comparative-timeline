// Main Timeline Application
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
    }
    
    cacheElements() {
        this.topTimeline = document.getElementById('top-timeline');
        this.bottomTimeline = document.getElementById('bottom-timeline');
        this.modal = document.getElementById('event-modal');
        this.closeModal = document.querySelector('.close-modal');
        this.timelineContainer = document.querySelector('.timeline-container');
    }
    
    // FIXED: Convert year to pixel position
    yearToPixel(year, position) {
        const era = position === 'top' ? this.config.topEra : this.config.bottomEra;
        const relativeYear = year - era.start;
        const relativePercent = relativeYear / (era.end - era.start);
        const totalWidth = (era.end - era.start) * this.currentZoom;
        return (relativePercent * totalWidth) + this.currentOffset + 50; // +50 for padding
    }
    
    // Create year markers
    createYearMarkers() {
        this.clearYearMarkers();
        this.createMarkersForEra('top', this.config.topEra);
        this.createMarkersForEra('bottom', this.config.bottomEra);
    }
    
    createMarkersForEra(position, era) {
        const container = position === 'top' ? this.topTimeline.parentElement : this.bottomTimeline.parentElement;
        
        for (let year = era.start; year <= era.end; year += 5) {
            const pixelX = this.yearToPixel(year, position);
            
            // Marker line
            const marker = document.createElement('div');
            marker.className = 'year-marker';
            marker.style.left = `${pixelX}px`;
            
            // Label
            const label = document.createElement('div');
            label.className = `year-label ${position}-label`;
            label.textContent = year;
            label.style.left = `${pixelX}px`;
            
            container.appendChild(marker);
            container.appendChild(label);
        }
    }
    
    clearYearMarkers() {
        document.querySelectorAll('.year-marker, .year-label').forEach(el => el.remove());
    }
    
    // FIXED: Smart card stacking
    calculateCardPositions(events, position) {
        const placedCards = [];
        const sortedEvents = [...events].sort((a, b) => a.year - b.year);
        
        sortedEvents.forEach(event => {
            const x = this.yearToPixel(event.year, position);
            const cardWidth = 140;
            
            // Find available vertical lane
            let laneIndex = 0;
            let collision = true;
            
            while (collision) {
                collision = false;
                
                // Check for collisions in this lane
                for (const placed of placedCards) {
                    if (placed.lane === laneIndex) {
                        const horizontalOverlap = Math.abs(placed.x - x) < cardWidth * 0.7;
                        if (horizontalOverlap) {
                            collision = true;
                            laneIndex++;
                            break;
                        }
                    }
                }
                
                if (!collision) {
                    break;
                }
            }
            
            // Calculate y position
            const y = 20 + (laneIndex * 100); // 100px vertical spacing
            
            placedCards.push({
                event: event,
                x: x,
                y: y,
                lane: laneIndex
            });
        });
        
        return placedCards;
    }
    
    // Render timeline
    renderTimeline() {
        this.clearTimeline();
        
        const topEvents = this.events.filter(e => e.position === 'top');
        const bottomEvents = this.events.filter(e => e.position === 'bottom');
        
        const topCards = this.calculateCardPositions(topEvents, 'top');
        const bottomCards = this.calculateCardPositions(bottomEvents, 'bottom');
        
        topCards.forEach(card => this.createEventCard(card.event, card.x, card.y));
        bottomCards.forEach(card => this.createEventCard(card.event, card.x, card.y));
        
        this.createYearMarkers();
    }
    
    clearTimeline() {
        if (this.topTimeline) this.topTimeline.innerHTML = '';
        if (this.bottomTimeline) this.bottomTimeline.innerHTML = '';
        this.clearYearMarkers();
    }
    
    // Create event card
    createEventCard(event, x, y) {
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
            ${event.image ? `<img class="card-image" src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.style.display='none'; this.parentElement.querySelector('.card-icon').style.fontSize='1.8rem';">` : ''}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${displayDate}</div>
        `;
        
        card.addEventListener('click', () => this.showEventDetails(event));
        
        if (event.position === 'top') {
            this.topTimeline.appendChild(card);
        } else {
            this.bottomTimeline.appendChild(card);
        }
    }
    
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short'
        });
    }
    
    // Event detail modal
    showEventDetails(event) {
        document.getElementById('modal-title').textContent = event.title;
        document.getElementById('modal-date').textContent = this.formatDate(event.date) + ' - Full Details';
        document.getElementById('modal-description').textContent = event.description;
        document.getElementById('modal-type').textContent = event.type.charAt(0).toUpperCase() + event.type.slice(1);
        document.getElementById('modal-position').textContent = event.position === 'top' ? 'Person A' : 'Person B';
        
        // Image handling
        const modalImage = document.getElementById('modal-image');
        const imageFallback = document.getElementById('image-fallback');
        
        if (event.image) {
            modalImage.src = event.image;
            modalImage.alt = event.title;
            modalImage.style.display = 'block';
            imageFallback.style.display = 'none';
            modalImage.onerror = () => {
                modalImage.style.display = 'none';
                imageFallback.style.display = 'flex';
            };
        } else {
            modalImage.style.display = 'none';
            imageFallback.style.display = 'flex';
        }
        
        // Video handling
        const videoContainer = document.getElementById('modal-video-container');
        const videoLink = document.getElementById('video-link');
        
        if (event.video) {
            videoContainer.style.display = 'block';
            videoLink.href = event.video;
            videoLink.innerHTML = event.video.includes('youtube') 
                ? '<i class="fab fa-youtube"></i> Watch YouTube Video'
                : '<i class="fab fa-vimeo"></i> Watch Video';
        } else {
            videoContainer.style.display = 'none';
        }
        
        // Tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        
        if (event.tags && event.tags.length > 0) {
            event.tags.forEach(tagId => {
                const tagDef = TAG_DEFINITIONS[tagId];
                if (tagDef) {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.textContent = tagDef.name;
                    tagElement.style.backgroundColor = tagDef.color;
                    tagsContainer.appendChild(tagElement);
                }
            });
        }
        
        this.modal.style.display = 'block';
    }
    
    setupModal() {
        // Ensure modal starts hidden
        if (this.modal) {
            this.modal.style.display = 'none';
        }
        
        this.closeModal.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
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
        // Zoom buttons
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());
        
        // Drag events for both timelines
        [this.topTimeline, this.bottomTimeline].forEach(track => {
            if (!track) return;
            
            track.addEventListener('mousedown', (e) => this.startDrag(e));
            track.addEventListener('mousemove', (e) => this.drag(e));
            track.addEventListener('mouseup', () => this.stopDrag());
            track.addEventListener('mouseleave', () => this.stopDrag());
            
            track.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
            track.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.drag(e.touches[0]);
            });
            track.addEventListener('touchend', () => this.stopDrag());
        });
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.dragStartX = e.clientX;
        this.dragStartOffset = this.currentOffset;
        if (this.topTimeline) this.topTimeline.style.cursor = 'grabbing';
        if (this.bottomTimeline) this.bottomTimeline.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.dragStartX;
        this.currentOffset = this.dragStartOffset + deltaX;
        this.renderTimeline();
    }
    
    stopDrag() {
        this.isDragging = false;
        if (this.topTimeline) this.topTimeline.style.cursor = 'grab';
        if (this.bottomTimeline) this.bottomTimeline.style.cursor = 'grab';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Ensure modal is hidden on load
    const modal = document.getElementById('event-modal');
    if (modal) modal.style.display = 'none';
    
    // Initialize timeline
    window.timeline = new ComparativeTimeline();
    console.log('Timeline initialized');
});
