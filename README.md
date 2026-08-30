# Historical Parallels: Comparative Timeline

An interactive, dual-axis timeline comparing authoritarian behaviors between Nazi Germany (1920-1950) and contemporary U.S. politics (2000-2030). This tool maps Trump-era events to corresponding Hitler-era actions, visualizing the progression of authoritarian tactics across different constitutional systems.

## Live Demo

[View the timeline](https://kittencakemedia.github.io/comparative-timeline)

## Features

- **Dual Timeline Comparison**: Hitler events on top (1920-1950), Trump events mapped to corresponding Hitler years on bottom
- **Fascism Meter**: Quantifies authoritarian progression (0-100%) with historical reference points (Enabling Act: 65%, Nuremberg Laws: 75%, Kristallnacht: 85%, Wannsee Conference: 95%)
- **Tag Filtering**: Filter events by authoritarian category (Emergency Powers, Propaganda, Electoral Manipulation, etc.)
- **Interactive Cards**: Click any event for detailed information, images, and source citations
- **Zoom & Pan**: Pinch/button zoom preserves center point; horizontal scroll for timeline navigation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Auto-updating Version**: Timestamp shows last data update

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Hosting | GitHub Pages |
| Fonts | Google Fonts (Inter) |
| Icons | Font Awesome 6 |
| Version Control | Git / GitHub Desktop |

## Project Structure
comparative-timeline/
├── index.html # Main page structure
├── css/
│ └── style.css # Unified styling with CSS variables
├── js/
│ ├── data.js # 40 historical events (20 Hitler, 20 Trump)
│ ├── modal.js # Event detail modal system
│ └── timeline.js # Timeline rendering, zoom, filters, fascism meter
└── README.md # Documentation

## Data Schema

Each event contains:

```javascript
{
    id: "H-001",           // Unique identifier (H-XXX or T-XXX)
    date: "1933-02-27",    // Actual date
    year: 1933,            // Display year (Hitler year for mapped Trump events)
    actualYear: 2020,      // Actual year for Trump events (optional)
    title: "Event Title",
    description: "Detailed description...",
    image: "https://...",   // Wikimedia Commons or public domain image
    position: "top|bottom", // top = Hitler, bottom = Trump
    type: "circle|rect|diamond|star|bigrect|smallrect",
    tags: ["Category Name"],
    source: "Source citation",
    verified: { image, date, description }  // Data quality tracking
}

Adding New Events
To add a new Trump event:
Open js/data.js
Add a new event object to the timelineEvents array
Set position: "bottom"
Set year to the Hitler year it maps to (for alignment)
Set actualYear to the actual calendar year
Add appropriate tags from the existing tag list
The Fascism Meter will automatically update when new events are added.

Fascism Meter Algorithm
The meter calculates a score based on:
Factor	Weight	Description
Tag weight	3-10	Severity of authoritarian category
Recency	0.3-1.0	Recent events weighted higher
Event type	+0.2	Big events (bigrect/star) get bonus
Multiple tags	+0.15 per tag	Events affecting multiple dimensions
Resistance factor	0.7	U.S. constitutional guardrails