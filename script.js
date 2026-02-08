console.log("Script loading in debug mode...");

// IMMEDIATELY hide modal on load
window.addEventListener('load', function() {
    console.log("Page loaded - forcing modal closed");
    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.style.display = 'none';
        console.log("Modal hidden");
    }
    
    // Also hide via CSS
    const style = document.createElement('style');
    style.textContent = '#event-modal { display: none !important; }';
    document.head.appendChild(style);
});

// Then load the rest of your timeline code...
// COPY AND PASTE YOUR ENTIRE EXISTING script.js CONTENT HERE
// starting from "class ComparativeTimeline {"

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
        this.renderTimeline();
        this.bindEvents();
        this.setupModal();
        this.createYearMarkers();
    }
    
    cacheElements() {
        this.topTimeline = document.getElementById('top-timeline');
        this.bottomTimeline = document.getElementById('bottom-timeline');
        this.modal = document.getElementById('event-modal');
        this.closeModal = document.querySelector('.close-modal');
    }
    
    // NEW: Convert year to pixel position with era alignment
    yearToPixel(year, position) {
        const era = position === 'top' ? this.config.topEra : this.config.bottomEra;
        
        // Calculate relative position within the 30-year period
        const relativeYear = year - era.start; // 0 to 30
        const relativePercent = relativeYear / (era.end - era.start); // 0 to 1
        
        // Map to pixel position
        const totalYears = 30; // Both periods are 30 years
        const pixelPosition = relativePercent * (totalYears * this.currentZoom);
        
        return pixelPosition + this.currentOffset;
    }
    
    // NEW: Create year markers every 5 years
    createYearMarkers() {
        this.createMarkersForEra('top', this.config.topEra);
        this.createMarkersForEra('bottom', this.config.bottomEra);
    }
    
    createMarkersForEra(position, era) {
        const timeline = position === 'top' ? this.topTimeline : this.bottomTimeline;
        const container = timeline.parentElement;
        
        for (let year = era.start; year <= era.end; year += 5) {
            const pixelX = this.yearToPixel(year, position);
            
            // Create marker line
            const marker = document.createElement('div');
            marker.className = 'year-marker';
            marker.style.left = `${pixelX}px`;
            
            // Create label
            const label = document.createElement('div');
            label.className = `year-label ${position}-label`;
            label.textContent = year;
            label.style.left = `${pixelX}px`;
            
            container.appendChild(marker);
            container.appendChild(label);
        }
    }
    
    // NEW: Smart card stacking to avoid overlaps
    calculateCardPositions(events, position) {
        const lanes = [];
        const placedCards = [];
        
        // Sort events by date
        const sortedEvents = [...events].sort((a, b) => a.year - b.year);
        
        sortedEvents.forEach(event => {
            const x = this.yearToPixel(event.year, position);
            const cardWidth = 180;
            const cardHeight = 140;
            
            // Find available lane (vertical position)
            let laneIndex = 0;
            let foundLane = false;
            
            while (!foundLane) {
                // Check if this lane is free at this x position
                const laneOccupied = placedCards.some(placed => {
                    return placed.lane === laneIndex &&
                           Math.abs(placed.x - x) < cardWidth * 0.8; // 80% overlap threshold
                });
                
                if (!laneOccupied) {
                    foundLane = true;
                } else {
                    laneIndex++;
                }
                
                // Create new lane if needed
                if (laneIndex >= lanes.length) {
                    lanes.push({ height: cardHeight });
                }
            }
            
            // Calculate y position based on lane
            const y = 10 + (laneIndex * (cardHeight * 0.7)); // 70% overlap for compactness
            
            placedCards.push({
                event: event,
                x: x,
                y: y,
                lane: laneIndex,
                width: cardWidth,
                height: cardHeight
            });
        });
        
        return placedCards;
    }
    
    // Render all events on timeline
    renderTimeline() {
        this.clearTimeline();
        this.clearYearMarkers();
        
        // Calculate positions for each era
        const topEvents = this.events.filter(e => e.position === 'top');
        const bottomEvents = this.events.filter(e => e.position === 'bottom');
        
        const topCards = this.calculateCardPositions(topEvents, 'top');
        const bottomCards = this.calculateCardPositions(bottomEvents, 'bottom');
        
        // Create cards
        topCards.forEach(card => this.createEventCard(card.event, card.x, card.y));
        bottomCards.forEach(card => this.createEventCard(card.event, card.x, card.y));
        
        // Recreate year markers (they get cleared)
        this.createYearMarkers();
    }
    
    clearTimeline() {
        this.topTimeline.innerHTML = '';
        this.bottomTimeline.innerHTML = '';
    }
    
    clearYearMarkers() {
        // Remove existing markers
        document.querySelectorAll('.year-marker, .year-label').forEach(el => el.remove());
    }
    
    // Create individual event card
    createEventCard(event, x, y) {
        const card = document.createElement('div');
        card.className = `timeline-card ${event.position}`;
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
        card.dataset.id = event.id;
        
        // Icon based on type
        const iconClass = TYPE_ICONS[event.type] || TYPE_ICONS.default;
        
        // Format date for display
        const displayDate = this.formatDate(event.date);
        
        // Card content
        card.innerHTML = `
            <div class="card-icon">
                <i class="${iconClass}"></i>
            </div>
            ${event.image ? `<img class="card-image" src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.style.display='none'; this.parentElement.querySelector('.card-icon').style.fontSize='1.8rem';">` : ''}
            <div class="card-title">${event.title}</div>
            <div class="card-year">${displayDate}</div>
        `;
        
        // Click event
        card.addEventListener('click', () => this.showEventDetails(event));
        
        // Add to appropriate timeline
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
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    // Event detail modal (same as before)
    showEventDetails(event) {
        document.getElementById('modal-title').textContent = event.title;
        document.getElementById('modal-date').textContent = this.formatDate(event.date);
        document.getElementById('modal-description').textContent = event.description;
        document.getElementById('modal-type').textContent = event.type.charAt(0).toUpperCase() + event.type.slice(1);
        document.getElementById('modal-position').textContent = event.position === 'top' ? 'Person A' : 'Person B';
        
        // Handle image
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
        
        // Handle video
        const videoContainer = document.getElementById('modal-video-container');
        const videoLink = document.getElementById('video-link');
        
        if (event.video) {
            videoContainer.style.display = 'block';
            videoLink.href = event.video;
            
            if (event.video.includes('youtube.com') || event.video.includes('youtu.be')) {
                videoLink.innerHTML = '<i class="fab fa-youtube"></i> Watch YouTube Video';
            } else if (event.video.includes('vimeo.com')) {
                videoLink.innerHTML = '<i class="fab fa-vimeo"></i> Watch Vimeo Video';
            }
        } else {
            videoContainer.style.display = 'none';
        }
        
        // Handle tags
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
        
        // Show modal
        this.modal.style.display = 'block';
    }
    
    setupModal() {
        this.closeModal.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
    }
    
    // Zoom functionality
    zoom(factor) {
        const newZoom = this.currentZoom * factor;
        
        if (newZoom >= this.config.minZoom && newZoom <= this.config.maxZoom) {
            this.currentZoom = newZoom;
            this.renderTimeline();
        }
    }
    
    // Reset view
    resetView() {
        this.currentZoom = this.config.pixelsPerYear;
        this.currentOffset = 0;
        this.renderTimeline();
    }
    
    // Drag functionality
    bindEvents() {
        const timelineTracks = [this.topTimeline, this.bottomTimeline];
        
        timelineTracks.forEach(track => {
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
        
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.dragStartX = e.clientX;
        this.dragStartOffset = this.currentOffset;
        document.body.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.dragStartX;
        this.currentOffset = this.dragStartOffset + deltaX;
        this.renderTimeline();
    }
    
    stopDrag() {
        this.isDragging = false;
        document.body.style.cursor = 'default';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timeline = new ComparativeTimeline();
    window.timeline = timeline;
    console.log('Comparative Timeline initialized with smart stacking');

// Ensure modal is hidden on page load
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.style.display = 'none';
    }
});
});