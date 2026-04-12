// Event data - will be replaced with your spreadsheet data
const timelineEvents = [
    { id: 1, date: "1933-02-27", year: 1933, title: "Reichstag Fire", description: "The German parliament building is set on fire. The Nazi government blames communists and uses the event as a pretext to suspend civil liberties.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp/1508px-Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp.png", position: "top", type: "circle", tags: ["Emergency Powers"] },
    { id: 2, date: "2020-11-07", year: 2020, title: "Trump's 'Rigged Election' Narrative", description: "After losing the 2020 presidential election, Trump and his allies persistently and falsely claim it was 'stolen' through widespread fraud.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Donald_Trump_%2850548277763%29.jpg", position: "bottom", type: "rect", tags: ["Electoral Manipulation"] },
    { id: 3, date: "1933-03-23", year: 1933, title: "Passage of the Enabling Act", description: "The Reichstag passes the Enabling Act, giving Hitler the power to make laws without parliamentary involvement, effectively ending German democracy.", image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Reichstagsgeb%C3%A4ude_von_Westen.jpg", position: "top", type: "smallrect", tags: ["Emergency Powers"] },
    { id: 4, date: "2021-01-06", year: 2021, title: "Trump's Pressure on Pence", description: "President Trump publicly pressured Vice President Pence to reject electoral votes, an action beyond the VP's constitutional power.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Mike_Pence_by_Gage_Skidmore_4.jpg", position: "bottom", type: "bigrect", tags: ["Electoral Manipulation"] },
    { id: 5, date: "1934-06-30", year: 1934, title: "Night of the Long Knives", description: "Hitler orders the murder of the SA leadership and other political rivals to consolidate power and appease the regular army.", image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Ernst_R%C3%B6hm_und_Heinrich_Himmler.JPG", position: "top", type: "rect", tags: ["Loyalty Purges"] },
    { id: 6, date: "2017-05-09", year: 2017, title: "Firing of James Comey", description: "President Trump fires the FBI Director who was leading an investigation into potential links between Trump's campaign and Russia.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/James_Comey_official_portrait.jpg", position: "bottom", type: "diamond", tags: ["Legal Undermining"] }
];

// Tag color mapping
const TAG_COLORS = {
    "Emergency Powers": "#B22222",
    "Electoral Manipulation": "#2E8B57",
    "Loyalty Purges": "#DC143C",
    "Legal Undermining": "#228B22"
};
