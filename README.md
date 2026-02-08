# Comparative Timeline Prototype

A dual-axis, card-based comparative timeline for visualizing historical parallels between two figures from different eras.

## Quick Start

1. **Download all 5 files** into the same folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - `timeline-data.js`
   - `README.md` (this file)

2. **Open `index.html`** in your web browser (Chrome or Firefox recommended).

3. **Interact with the timeline:**
   - Click event cards for detailed view
   - Drag timeline to pan left/right
   - Use zoom buttons (+/-) to adjust scale
   - Click "Reset View" to return to default

## Features

- **Dual Timeline System:** Top (1920-1950) and Bottom (2000-2030) eras
- **Modern Card Design:** Clean, responsive event cards with hover effects
- **Interactive Details:** Modal popups with full event descriptions, images, and tags
- **Flexible Styling:** Easily customizable colors via CSS variables
- **Responsive:** Works on desktop and mobile devices

## Customization

### Changing Colors
Edit the CSS variables in `style.css` at the top of the file:

```css
:root {
    --timeline-top-color: #DC143C;      /* Change Person A color */
    --timeline-bottom-color: #1E90FF;   /* Change Person B color */
    --timeline-bg: #f8f9fa;             /* Background color */
    /* ... other variables */
}