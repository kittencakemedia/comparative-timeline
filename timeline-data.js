// Tag definitions matching your Google Sheet
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

// Icon mapping based on Type column
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

// Sample event data (converted from your CSV)
const timelineEvents = [
    {
        id: 1,
        date: "1933-02-27",
        year: 1933,
        title: "Reichstag Fire",
        description: "The German parliament building is set on fire. The Nazi government blames communists and uses the event as a pretext to suspend civil liberties and eliminate political opposition.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp/1508px-Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp.png?20240512222100",
        video: "",
        position: "top",
        type: "circle",
        tags: [1, 2],
        era: "Person A (1920-1950)"
    },
    {
        id: 2,
        date: "2020-11-07",
        year: 2020,
        title: "Trump's \"Rigged Election\" Narrative",
        description: "After losing the 2020 presidential election, Trump and his allies persistently and falsely claim it was \"stolen\" through widespread fraud, aiming to undermine faith in the electoral process.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Donald_Trump_%2850548277763%29.jpg",
        video: "",
        position: "bottom",
        type: "rect",
        tags: [1],
        era: "Person B (2000-2030)"
    },
    {
        id: 3,
        date: "1933-03-23",
        year: 1933,
        title: "Passage of the Enabling Act",
        description: "The Reichstag passes the Enabling Act, giving Adolf Hitler the power to make laws without the involvement of the parliament or president, effectively ending German democracy.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Reichstagsgeb%C3%A4ude_von_Westen.jpg",
        video: "",
        position: "top",
        type: "smallrect",
        tags: [1],
        era: "Person A (1920-1950)"
    },
    {
        id: 4,
        date: "2021-01-06",
        year: 2021,
        title: "Trump's Pressure on Pence to Overturn Election",
        description: "During the certification of the 2020 election, President Trump publicly pressured Vice President Pence to reject electoral votes, an action beyond the VP's constitutional power.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Mike_Pence_by_Gage_Skidmore_4.jpg",
        video: "",
        position: "bottom",
        type: "bigrect",
        tags: [1],
        era: "Person B (2000-2030)"
    },
    {
        id: 5,
        date: "1934-06-30",
        year: 1934,
        title: "Night of the Long Knives",
        description: "Hitler orders the murder of the leadership of the SA (Brownshirts) and other political rivals within his own party to consolidate his power and appease the regular army.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Ernst_R%C3%B6hm_und_Heinrich_Himmler.JPG",
        video: "",
        position: "top",
        type: "rect",
        tags: [1, 3],
        era: "Person A (1920-1950)"
    },
    {
        id: 6,
        date: "2017-05-09",
        year: 2017,
        title: "Firing of James Comey",
        description: "President Trump fires the Director of the FBI, who was leading an investigation into potential links between Trump's campaign and Russia.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/James_Comey_official_portrait.jpg",
        video: "",
        position: "bottom",
        type: "diamond",
        tags: [1],
        era: "Person B (2000-2030)"
    },
    {
    id: 7,
    date: "2013-01-01",
    year: 2013,
    title: "Test Alignment Event",
    description: "This should align vertically with 1933 events",
    image: "",
    video: "",
    position: "bottom",
    type: "circle",
    tags: [1],
    era: "Person B (2000-2030)"
    }
];

// ... keep all your existing TAG_DEFINITIONS and timelineEvents ...

// UPDATED Timeline configuration - Now 30-year aligned periods
const TIMELINE_CONFIG = {
    topEra: { start: 1920, end: 1950, label: "Person A Era (1920-1950)" },
    bottomEra: { start: 2000, end: 2030, label: "Person B Era (2000-2030)" },
    pixelsPerYear: 60, // Increased for better spacing
    minZoom: 30,
    maxZoom: 120
};