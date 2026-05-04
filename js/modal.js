// Modal System - Reusable and isolated
class EventModal {
    constructor() {
        this.createModal();
    }
    
    createModal() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'custom-alert-overlay';
        document.body.appendChild(this.overlay);
        
        this.container = document.createElement('div');
        this.container.className = 'custom-alert';
        this.container.innerHTML = `
            <div class="custom-alert-header">
                <span id="alert-title">Event Title</span>
                <span class="custom-alert-close" id="alert-close">&times;</span>
            </div>
            <div class="custom-alert-body">
                <img id="alert-image" style="max-width: 100%; max-height: 150px; border-radius: 8px; margin-bottom: 15px; display: none;">
                <div id="alert-fallback" style="display: none; text-align: center; padding: 20px; background: #f5f5f5; border-radius: 8px;">📷 No image</div>
                <p id="alert-description" style="margin-bottom: 15px;"></p>
                <div id="alert-tags" style="display: flex; flex-wrap: wrap; gap: 6px;"></div>
            </div>
        `;
        document.body.appendChild(this.container);
        
        document.getElementById('alert-close').onclick = () => this.hide();
        this.overlay.onclick = () => this.hide();
    }
    
    show(event) {
        document.getElementById('alert-title').textContent = event.title;
        document.getElementById('alert-description').textContent = event.description;
        
        const img = document.getElementById('alert-image');
        const fallback = document.getElementById('alert-fallback');
        if (event.image && event.image !== '') {
            img.src = event.image;
            img.style.display = 'block';
            fallback.style.display = 'none';
        } else {
            img.style.display = 'none';
            fallback.style.display = 'block';
        }
        
        const tagsContainer = document.getElementById('alert-tags');
        tagsContainer.innerHTML = '';
        if (event.tags && event.tags.length) {
            event.tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                span.style.cssText = 'padding: 3px 10px; border-radius: 16px; font-size: 0.7rem; font-weight: 600; color: white; background-color: #B22222;';
                tagsContainer.appendChild(span);
            });
        }
        
        this.overlay.style.display = 'block';
        this.container.style.display = 'block';
    }
    
    hide() {
        this.overlay.style.display = 'none';
        this.container.style.display = 'none';
    }
}
