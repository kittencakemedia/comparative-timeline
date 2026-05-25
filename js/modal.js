// Modal System
class EventModal {
    constructor() {
        this.createModal();
    }
    
    createModal() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'custom-alert-overlay';
        document.body.appendChild(this.overlay);
        
        // Create modal container
        this.container = document.createElement('div');
        this.container.className = 'custom-alert';
       this.container.innerHTML = `
        <div class="custom-alert-header">
            <span id="modal-title">Event Title</span>
            <span class="custom-alert-close" id="modal-close">&times;</span>
        </div>
        <div class="custom-alert-body">
            <img id="modal-image" style="max-width: 100%; max-height: 150px; border-radius: 8px; margin-bottom: 15px; display: none;">
            <div id="modal-fallback" style="display: none; text-align: center; padding: 20px; background: #f5f5f5; border-radius: 8px;"></div>
            <div id="modal-date-display"></div>
            <p id="modal-description"></p>
            <div id="modal-tags"></div>
        </div>
    `;
        document.body.appendChild(this.container);
        
        // Store references with consistent IDs
        this.titleEl = document.getElementById('modal-title');
        this.descEl = document.getElementById('modal-description');
        this.imgEl = document.getElementById('modal-image');
        this.fallbackEl = document.getElementById('modal-fallback');
        this.tagsEl = document.getElementById('modal-tags');
        
        // Close events
        const closeBtn = document.getElementById('modal-close');
        if (closeBtn) {
            closeBtn.onclick = () => this.hide();
        }
        this.overlay.onclick = () => this.hide();
        
        console.log('Modal created successfully');
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
    
    show(event) {
        console.log('Modal show called for:', event.title);
        
        if (!this.titleEl) {
            console.error('Modal elements not found');
            return;
        }
        
        // Set content
        this.titleEl.textContent = event.title;
        this.descEl.textContent = event.description;
        
        // Format date for modal (no separate date element, include in description or add one)
        const eventDate = new Date(event.date);
        const dateStr = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        // Add date to description or create a date element
        const dateDisplay = document.getElementById('modal-date-display');
        if (!dateDisplay) {
            // Create date element if it doesn't exist
            const dateElement = document.createElement('div');
            dateElement.id = 'modal-date-display';
            dateElement.style.cssText = 'font-size: 0.8rem; color: #666; margin-bottom: 10px;';
            this.descEl.parentNode.insertBefore(dateElement, this.descEl);
            dateElement.textContent = dateStr;
        } else {
            dateDisplay.textContent = dateStr;
        }
        
        const fallbackIcon = this.getFallbackIcon(event.tags);
        
        // Handle image
        if (event.image && event.image !== '' && !event.image.includes('example.com')) {
            this.imgEl.src = event.image;
            this.imgEl.style.display = 'block';
            this.fallbackEl.style.display = 'none';
            this.imgEl.onerror = () => {
                this.imgEl.style.display = 'none';
                this.fallbackEl.style.display = 'block';
                this.fallbackEl.innerHTML = `<div style="font-size: 3rem;">${fallbackIcon}</div><div>No image available</div>`;
            };
        } else {
            this.imgEl.style.display = 'none';
            this.fallbackEl.style.display = 'block';
            this.fallbackEl.innerHTML = `<div style="font-size: 3rem;">${fallbackIcon}</div><div>No image available</div>`;
        }
        
        // Handle tags
        this.tagsEl.innerHTML = '';
        if (event.tags && event.tags.length) {
            event.tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                span.style.cssText = 'padding: 3px 10px; border-radius: 16px; font-size: 0.7rem; font-weight: 600; color: white; background-color: #B22222; margin-right: 6px; display: inline-block;';
                this.tagsEl.appendChild(span);
            });
        }
        
        // Show modal
        this.overlay.style.display = 'block';
        this.container.style.display = 'block';
        console.log('Modal displayed');
    }
    
    hide() {
        this.overlay.style.display = 'none';
        this.container.style.display = 'none';
    }
}