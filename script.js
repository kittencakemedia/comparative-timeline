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
    
    // back to basics.
yearToPixel(year, position) {
    const era = position === 'top' ? this.config.topEra : this.config.bottomEra;
    
    // Calculate relative position (0 to 1)
    const relativePosition = (year - era.start) / (era.end - era.start);
    
    // Calculate total width
    const totalWidth = (era.end - era.start) * this.currentZoom;
    
    // Calculate pixel position
    const pixelPos = 100 + (relativePosition * totalWidth) + this.currentOffset;
    
    return pixelPos;
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
    //back to basics..
 calculateCardPositions(events, position) {
    const placedCards = [];
    const cardWidth = 140;
    const verticalSpacing = 45;
    
    // Sort by year
    const sortedEvents = [...events].sort((a, b) => a.year - b.year);
    
    // Track used lanes for each year separately
    const yearLanes = new Map(); // year -> Set of used lanes
    
    sortedEvents.forEach(event => {
        const x = this.yearToPixel(event.year, position);
        const year = event.year;
        
        // Get or create lane tracker for this year
        if (!yearLanes.has(year)) {
            yearLanes.set(year, new Set());
        }
        const usedLanes = yearLanes.get(year);
        
        // Find smallest available lane for THIS YEAR ONLY
        let laneIndex = 0;
        while (usedLanes.has(laneIndex)) {
            laneIndex++;
        }
        
        // Mark this lane as used for this year
        usedLanes.add(laneIndex);
        
        // Calculate Y position
        const y = 20 + (laneIndex * verticalSpacing);
        
        // Add slight horizontal cascade
        const xOffset = laneIndex * 8;
        const finalX = x + xOffset;
        
        placedCards.push({
            event: event,
            x: finalX,
            y: y,
            lane: laneIndex,
            year: year
        });
        
        console.log(`Year ${year}: ${event.title} -> lane ${laneIndex}, y=${y}`);
    });
    
    // Log final lane usage by year
    console.log('Lane usage by year:');
    yearLanes.forEach((lanes, year) => {
        console.log(`Year ${year}: lanes [${Array.from(lanes).join(', ')}]`);
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
    
    // Create event card - FIXED click handler
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
    
    // FIXED: Explicit click handler with debug
    card.onclick = (e) => {
        e.stopPropagation();
        console.log('Card clicked:', event.title);
        this.showEventDetails(event);
    };
    
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
    console.log('Opening modal for:', event.title);
    
    // Get modal elements
    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDesc = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const imageFallback = document.getElementById('image-fallback');
    const modalTags = document.getElementById('modal-tags');
    const videoContainer = document.getElementById('modal-video-container');
    const videoLink = document.getElementById('video-link');
    const modalType = document.getElementById('modal-type');
    const modalPosition = document.getElementById('modal-position');
    
    // Debug: Check if elements exist
    console.log('Modal element found:', !!modal);
    console.log('Title element found:', !!modalTitle);
    console.log('Description element found:', !!modalDesc);
    
    if (!modal) {
        console.error('CRITICAL: Modal element not found in HTML!');
        return;
    }
    
    // Populate basic fields
    if (modalTitle) modalTitle.textContent = event.title || 'No title';
    if (modalDate) modalDate.textContent = this.formatDate(event.date) || 'Date unknown';
    if (modalDesc) modalDesc.textContent = event.description || 'No description available';
    if (modalType) modalType.textContent = event.type || 'event';
    if (modalPosition) modalPosition.textContent = event.position === 'top' ? 'Person A' : 'Person B';
    
    // Handle image
    if (modalImage && imageFallback) {
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
    }
    
    // Handle video
    if (videoContainer && videoLink) {
        if (event.video) {
            videoContainer.style.display = 'block';
            videoLink.href = event.video;
            videoLink.innerHTML = event.video.includes('youtube') 
                ? '<i class="fab fa-youtube"></i> Watch YouTube Video'
                : '<i class="fab fa-vimeo"></i> Watch Video';
        } else {
            videoContainer.style.display = 'none';
        }
    }
    
    // Handle tags
    if (modalTags) {
        modalTags.innerHTML = '';
        if (event.tags && event.tags.length > 0) {
            event.tags.forEach(tagId => {
                const tagDef = TAG_DEFINITIONS[tagId];
                if (tagDef) {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.textContent = tagDef.name;
                    tagElement.style.backgroundColor = tagDef.color;
                    modalTags.appendChild(tagElement);
                }
            });
        }
    }
    
    // FORCE modal to show
    modal.style.display = 'block';
    console.log('Modal display set to block');
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
