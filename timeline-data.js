// ============================================
// COMPARATIVE TIMELINE - PRODUCTION DATA
// Historical Parallels: Hitler vs Trump
// Last updated: 2024-04-19
// ============================================

// Tag Definitions
const TAG_DEFINITIONS = {
    1: { id: 1, name: "Emergency Powers & Crisis Exploitation", color: "#B22222", icon: "⚡" },
    2: { id: 2, name: "Propaganda & Media Control", color: "#1E90FF", icon: "📢" },
    3: { id: 3, name: "Judiciary & Legal Undermining", color: "#228B22", icon: "⚖️❌" },
    4: { id: 4, name: "State-Sanctioned Violence & Intimidation", color: "#FFD700", icon: "💥" },
    5: { id: 5, name: "Surveillance & Internal Policing", color: "#8A2BE2", icon: "👁️" },
    6: { id: 6, name: "Loyalty Purges & Political Patronage", color: "#DC143C", icon: "🗡️" },
    7: { id: 7, name: "Electoral Manipulation & Democratic Erosion", color: "#2E8B57", icon: "🗳️❌" },
    8: { id: 8, name: "Cult of Personality & Mass Mobilization", color: "#FF8C00", icon: "👤✨" },
    9: { id: 9, name: "Authoritarian Ideology & Nationalism", color: "#FF6EDF", icon: "👑" },
    10: { id: 10, name: "Legal Manipulation & Institutional Capture", color: "#FF8CDE", icon: "⚖️❌" }
};

// Fallback icons by tag (used when image is missing)
const FALLBACK_ICONS = {
    "Emergency Powers": "⚡",
    "Propaganda & Media Control": "📢",
    "Judiciary & Legal Undermining": "⚖️❌",
    "State-Sanctioned Violence & Intimidation": "💥",
    "Surveillance & Internal Policing": "👁️",
    "Loyalty Purges & Political Patronage": "🗡️",
    "Electoral Manipulation & Democratic Erosion": "🗳️❌",
    "Cult of Personality & Mass Mobilization": "👤✨",
    "Authoritarian Ideology & Nationalism": "👑",
    "Legal Manipulation & Institutional Capture": "⚖️❌"
};

// ============================================
// HITLER EVENTS (Top Timeline)
// Display year = actual historical date
// ============================================

const hitlerEvents = [
    {
        id: "H-001",
        date: "1933-02-27",
        year: 1933,
        title: "Reichstag Fire",
        description: "The German parliament building is set on fire. The Nazi government blames communists and uses the event as a pretext to suspend civil liberties and eliminate political opposition.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp/1508px-Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp.png",
        video: "",
        position: "top",
        type: "circle",
        tags: ["Emergency Powers & Crisis Exploitation", "Propaganda & Media Control"],
        mappedTo: "T-001",
        source: "History.com",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-002",
        date: "1933-03-23",
        year: 1933,
        title: "Passage of the Enabling Act",
        description: "The Reichstag passes the Enabling Act, giving Adolf Hitler the power to make laws without the involvement of the parliament or president, effectively ending German democracy.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Reichstagsgeb%C3%A4ude_von_Westen.jpg",
        video: "",
        position: "top",
        type: "smallrect",
        tags: ["Emergency Powers & Crisis Exploitation"],
        mappedTo: "T-002",
        source: "Britannica",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-003",
        date: "1934-06-30",
        year: 1934,
        title: "Night of the Long Knives",
        description: "Hitler orders the murder of the leadership of the SA (Brownshirts) and other political rivals within his own party to consolidate his power and appease the regular army.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Ernst_R%C3%B6hm_und_Heinrich_Himmler.JPG",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage", "Emergency Powers & Crisis Exploitation"],
        mappedTo: "T-003",
        source: "Britannica",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-004",
        date: "1923-11-08",
        year: 1923,
        title: "Beer Hall Putsch",
        description: "Hitler's failed attempt to seize power in Munich by force. Though it failed, the subsequent trial made him a national figure and he used the platform to spread his ideology.",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Bundesarchiv_Bild_119-1426%2C_Hitler-Putsch%2C_M%C3%BCnchen%2C_Odeonsplatz.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "T-004",
        source: "DW.com",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-005",
        date: "1933-04-01",
        year: 1933,
        title: "Boycott of Jewish Businesses",
        description: "The Nazi Party orchestrates a one-day boycott of Jewish-owned businesses, a key early public act of organized persecution and discrimination.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Bundesarchiv_Bild_102-14469%2C_Berlin%2C_Boykott_gegen_j%C3%BCdische_Gesch%C3%A4fte.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "T-005",
        source: "Britannica",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-006",
        date: "1934-08-02",
        year: 1934,
        title: "Hitler Becomes Führer",
        description: "Upon President Hindenburg's death, Hitler merges the roles of Chancellor and President, assuming the title of Führer and completing his personal consolidation of power.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler_retouched.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Cult of Personality & Mass Mobilization"],
        mappedTo: "T-006",
        source: "History.com",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-007",
        date: "1935-09-15",
        year: 1935,
        title: "Nuremberg Race Laws",
        description: "These laws institutionalized racial theories and provided the legal framework for the systematic persecution of Jews, including stripping them of citizenship.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Rassentafel.jpg",
        video: "",
        position: "top",
        type: "bigrect",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "T-007",
        source: "USHMM",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-008",
        date: "1938-11-09",
        year: 1938,
        title: "Kristallnacht (Night of Broken Glass)",
        description: "A state-sanctioned pogrom against Jews throughout Nazi Germany, involving the destruction of synagogues, homes, and businesses, and mass arrests.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Bundesarchiv_Bild_146-1970-083-44%2C_Reichskristallnacht%2C_zerst%C3%B6rte_Judengesch%C3%A4ft.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["State-Sanctioned Violence & Intimidation"],
        mappedTo: "T-008",
        source: "Britannica",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-009",
        date: "1934-08-02",
        year: 1934,
        title: "Mass Oath of Loyalty to Hitler",
        description: "The German armed forces (Reichswehr) are required to swear a personal oath of allegiance to Adolf Hitler himself, not to the constitution or the nation.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bundesarchiv_Bild_183-H12478%2C_Wehrmacht%2C_Eid_auf_Adolf_Hitler.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "T-009",
        source: "Britannica",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-010",
        date: "1938-02-04",
        year: 1938,
        title: "Reorganization of the Armed Forces High Command",
        description: "Hitler removes key conservative generals opposed to his aggressive foreign policy and places the armed forces directly under his personal command.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Bundesarchiv_Bild_183-H12908%2C_Werner_von_Blomberg.jpg",
        video: "",
        position: "top",
        type: "diamond",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "T-010",
        source: "Britannica",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-011",
        date: "1944-08-24",
        year: 1944,
        title: "Order for Total War",
        description: "Hitler bypasses his own ministers and uses a personal decree to mobilize the entire German economy and population for war, centralizing control.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Bundesarchiv_Bild_183-J14814%2C_Goebbels-Propaganda_f%C3%BCr_den_Totalen_Krieg.jpg",
        video: "",
        position: "top",
        type: "smallrect",
        tags: ["Emergency Powers & Crisis Exploitation"],
        mappedTo: "T-011",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-012",
        date: "1933-03-31",
        year: 1933,
        title: "First Gleichschaltung Law",
        description: "This law dissolved the existing state parliaments and reconstituted them based on the recent Reichstag election results, effectively eliminating state-level opposition.",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Bundesarchiv_Bild_102-14446%2C_Potsdam%2C_Reichstagsabgeordnete_zur_Reichstagser%C3%B6ffnung.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Legal Manipulation & Institutional Capture"],
        mappedTo: "T-012",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-013",
        date: "1933-04-07",
        year: 1933,
        title: "Law for the Restoration of the Professional Civil Service",
        description: "This law mandated the removal of 'non-Aryan' and politically unreliable civil servants, purging the state bureaucracy of opposition.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bundesarchiv_Bild_102-14468%2C_Ausstellung_%22Der_ewige_Jude%22.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "T-013",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-014",
        date: "1933-03-13",
        year: 1933,
        title: "Establishment of the Ministry of Propaganda",
        description: "Joseph Goebbels is appointed head of the newly formed Reich Ministry of Public Enlightenment and Propaganda, centralizing state control over all media.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Bundesarchiv_Bild_102-13774%2C_Joseph_Goebbels.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Propaganda & Media Control"],
        mappedTo: "T-014",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-015",
        date: "1934-01-30",
        year: 1934,
        title: "Law for the Reconstruction of the Reich",
        description: "This law formally dissolved the state parliaments and transferred all sovereignty from the states to the central government in Berlin.",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Bundesarchiv_Bild_102-14446%2C_Potsdam%2C_Reichstagsabgeordnete_zur_Reichstagser%C3%B6ffnung.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Legal Manipulation & Institutional Capture"],
        mappedTo: "T-015",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-016",
        date: "1933-02-04",
        year: 1933,
        title: "Reichstag Fire Decree",
        description: "The Decree for the Protection of People and State suspended civil liberties, enabled indefinite detention without trial, and removed restraints on police power.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Bundesarchiv_Bild_102-14516%2C_Berlin%2C_brennender_Reichstag.jpg",
        video: "",
        position: "top",
        type: "bigrect",
        tags: ["Emergency Powers & Crisis Exploitation"],
        mappedTo: "T-016",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-017",
        date: "1938-06-22",
        year: 1938,
        title: "Requirement to Register Jewish Wealth",
        description: "A decree forcing Jews to register all property and assets above a certain value, a prelude to state confiscation ('Aryanization').",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bundesarchiv_Bild_102-14468%2C_Ausstellung_%22Der_ewige_Jude%22.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Surveillance & Internal Policing"],
        mappedTo: "T-017",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-018",
        date: "1942-01-20",
        year: 1942,
        title: "Wannsee Conference",
        description: "Senior Nazi officials met to coordinate the administrative logistics of the 'Final Solution,' the systematic deportation and murder of Europe's Jews.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Bundesarchiv_Bild_183-R97512%2C_Wannseekonferenz.jpg",
        video: "",
        position: "top",
        type: "smallrect",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "T-018",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-019",
        date: "1933-07-14",
        year: 1933,
        title: "Law Against the Formation of New Parties",
        description: "This law formally made the Nazi Party the only legal political party in Germany, institutionalizing the one-party state.",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Bundesarchiv_Bild_102-14446%2C_Potsdam%2C_Reichstagsabgeordnete_zur_Reichstagser%C3%B6ffnung.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Electoral Manipulation & Democratic Erosion"],
        mappedTo: "T-019",
        source: "",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-020",
        date: "1934-07-20",
        year: 1934,
        title: "SS Becomes Independent Organization",
        description: "The SS, the primary agent of Nazi terror and racial policy, was removed from the SA's control and made an independent organization answerable only to Hitler.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Ernst_R%C3%B6hm%2C_c._1930.jpg",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "T-020",
        source: "",
        verified: { image: true, date: true, description: true }
    }
];

// ============================================
// TRUMP EVENTS (Bottom Timeline)
// Display year = Hitler's year (mapped event)
// ============================================

const trumpEvents = [
    {
        id: "T-001",
        date: "2020-11-07",
        year: 1933,  // Maps to H-001 (Reichstag Fire)
        actualYear: 2020,
        title: "Trump's 'Rigged Election' Narrative",
        description: "After losing the 2020 presidential election, Trump and his allies persistently and falsely claim it was 'stolen' through widespread fraud, aiming to undermine faith in the electoral process.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Donald_Trump_%2850548277763%29.jpg",
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Electoral Manipulation & Democratic Erosion"],
        mappedTo: "H-001",
        source: "USHMM",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "T-002",
        date: "2021-01-06",
        year: 1933,  // Maps to H-002 (Enabling Act)
        actualYear: 2021,
        title: "Trump's Pressure on Pence to Overturn Election",
        description: "During the certification of the 2020 election, President Trump publicly pressured Vice President Pence to reject electoral votes, an action beyond the VP's constitutional power.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Mike_Pence_by_Gage_Skidmore_4.jpg",
        video: "",
        position: "bottom",
        type: "bigrect",
        tags: ["Electoral Manipulation & Democratic Erosion"],
        mappedTo: "H-002",
        source: "Historyplace.com",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "T-003",
        date: "2017-05-09",
        year: 1934,  // Maps to H-003 (Night of Long Knives)
        actualYear: 2017,
        title: "Firing of James Comey",
        description: "President Trump fires the Director of the FBI, who was leading an investigation into potential links between Trump's campaign and Russia.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/James_Comey_official_portrait.jpg",
        video: "",
        position: "bottom",
        type: "diamond",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-003",
        source: "JSTOR",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "T-004",
        date: "2015-06-16",
        year: 1923,  // Maps to H-004 (Beer Hall Putsch)
        actualYear: 2015,
        title: "Trump's 2016 Campaign Launch",
        description: "Trump launches his presidential campaign, giving a speech characterized by strong nationalist rhetoric and attacks on institutions and minority groups.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Donald_Trump_announces_his_candidacy.jpg",
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "H-004",
        source: "JSTOR",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "T-005",
        date: "2017-01-27",
        year: 1933,  // Maps to H-005 (Jewish Boycott)
        actualYear: 2017,
        title: "Trump's 'Muslim Ban' Executive Order",
        description: "President Trump signs Executive Order 13769, 'Protecting the Nation from Foreign Terrorist Entry into the United States,' banning entry from several Muslim-majority countries.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Trump_announces_Supreme_Court_nomination_%2850330%29.jpg",
        video: "",
        position: "bottom",
        type: "star",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "H-005",
        source: "USHMM",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "T-006",
        date: "2016-07-21",
        year: 1934,  // Maps to H-006 (Hitler Becomes Führer)
        actualYear: 2016,
        title: "Trump's 'I Alone Can Fix It' Speech",
        description: "At the Republican National Convention, Trump states, 'I alone can fix it,' presenting himself as the singular solution to the nation's problems.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Cult of Personality & Mass Mobilization"],
        mappedTo: "H-006",
        source: "USHMM",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "👤✨"
    },
    {
        id: "T-007",
        date: "2017-08-15",
        year: 1935,  // Maps to H-007 (Nuremberg Laws)
        actualYear: 2017,
        title: "Trump's 'Very Fine People' Comment",
        description: "After the 'Unite the Right' rally in Charlottesville, Trump said there were 'very fine people on both sides,' equating white supremacists with counter-protesters.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "star",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "H-007",
        source: "USHMM",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "👑"
    },
    {
        id: "T-008",
        date: "2020-09-29",
        year: 1938,  // Maps to H-008 (Kristallnacht)
        actualYear: 2020,
        title: "Trump's 'Stand Back and Stand By' Comment",
        description: "During a presidential debate, when asked to condemn white supremacists, Trump told the Proud Boys to 'stand back and stand by.'",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["State-Sanctioned Violence & Intimidation"],
        mappedTo: "H-008",
        source: "Britannica",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "💥"
    },
    {
        id: "T-009",
        date: "2017-05-11",
        year: 1934,  // Maps to H-009 (Mass Oath)
        actualYear: 2017,
        title: "Trump's Demand for Loyalty from FBI Director",
        description: "In a meeting with Director James Comey, President Trump reportedly said, 'I need loyalty, I expect loyalty.'",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-009",
        source: "Britannica",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "🗡️"
    },
    {
        id: "T-010",
        date: "2020-11-09",
        year: 1938,  // Maps to H-010 (Reorganization)
        actualYear: 2020,
        title: "Trump's Firing of Defense Secretary Esper",
        description: "President Trump fires Secretary of Defense Mark Esper via tweet after Esper publicly opposed using active-duty troops for domestic law enforcement.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-010",
        source: "Britannica",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "🗡️"
    },
    {
        id: "T-011",
        date: "2020-04-28",
        year: 1944,  // Maps to H-011 (Total War)
        actualYear: 2020,
        title: "Trump's Use of Defense Production Act for Meat Plants",
        description: "President Trump uses the Defense Production Act to order meat processing plants to remain open during the COVID-19 pandemic, prioritizing supply chains over public health.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "bigrect",
        tags: ["Emergency Powers & Crisis Exploitation"],
        mappedTo: "H-011",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "⚡"
    },
    {
        id: "T-012",
        date: "2020-09-21",
        year: 1933,  // Maps to H-012 (Gleichschaltung)
        actualYear: 2020,
        title: "Trump's Threats to De-Fund 'Anarchist Jurisdictions'",
        description: "The Trump administration moves to cut federal funding to cities like New York and Portland, citing their leadership and protest activity.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "diamond",
        tags: ["Legal Manipulation & Institutional Capture"],
        mappedTo: "H-012",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "⚖️❌"
    },
    {
        id: "T-013",
        date: "2020-10-21",
        year: 1933,  // Maps to H-013 (Civil Service Law)
        actualYear: 2020,
        title: "Trump's Creation of 'Schedule F' Executive Order",
        description: "This executive order reclassified many federal civil service roles as political appointments, making it easier to fire career officials.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-013",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "🗡️"
    },
    {
        id: "T-014",
        date: "2020-11-02",
        year: 1933,  // Maps to H-014 (Propaganda Ministry)
        actualYear: 2020,
        title: "Trump's Creation of the '1776 Commission'",
        description: "Established to promote 'patriotic education,' this commission was widely seen as an attempt to create a state-sanctioned, partisan narrative of American history.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "star",
        tags: ["Propaganda & Media Control"],
        mappedTo: "H-014",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "📢"
    },
    {
        id: "T-015",
        date: "2024-00-00",
        year: 1934,  // Placeholder - needs replacement event
        actualYear: 2024,
        title: "PLACEHOLDER - Need Replacement Event",
        description: "This is a placeholder for a future Trump event that will map to H-015 (Reconstruction of the Reich).",
        image: "",
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Legal Manipulation & Institutional Capture"],
        mappedTo: "H-015",
        source: "",
        verified: { image: false, date: false, description: false },
        isPlaceholder: true,
        fallbackIcon: "⚖️❌"
    },
    {
        id: "T-016",
        date: "2020-05-29",
        year: 1933,  // Maps to H-016 (Reichstag Fire Decree)
        actualYear: 2020,
        title: "Trump's 'When the looting starts, the shooting starts' Tweet",
        description: "A tweet during George Floyd protests that was widely interpreted as endorsing or threatening violent state suppression of civil unrest.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "star",
        tags: ["State-Sanctioned Violence & Intimidation"],
        mappedTo: "H-016",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "💥"
    },
    {
        id: "T-017",
        date: "2015-11-21",
        year: 1938,  // Maps to H-017 (Register Jewish Wealth)
        actualYear: 2015,
        title: "Trump's Proposal to Surveil Mosques",
        description: "During his campaign, Trump stated he would implement surveillance of certain mosques and a database for Syrian refugees.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["Surveillance & Internal Policing"],
        mappedTo: "H-017",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "👁️"
    },
    {
        id: "T-018",
        date: "2024-00-00",
        year: 1942,  // Placeholder - needs replacement event
        actualYear: 2024,
        title: "PLACEHOLDER - Need Replacement Event",
        description: "This is a placeholder for a future Trump event that will map to H-018 (Wannsee Conference).",
        image: "",
        video: "",
        position: "bottom",
        type: "smallrect",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "H-018",
        source: "",
        verified: { image: false, date: false, description: false },
        isPlaceholder: true,
        fallbackIcon: "👑"
    },
    {
        id: "T-019",
        date: "2017-02-17",
        year: 1933,  // Maps to H-019 (Law Against New Parties)
        actualYear: 2017,
        title: "Trump's 'Enemy of the People' Rhetoric",
        description: "President Trump repeatedly refers to the news media as 'the enemy of the American people,' seeking to discredit a key institution of democratic accountability.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "diamond",
        tags: ["Propaganda & Media Control"],
        mappedTo: "H-019",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "📢"
    },
    {
        id: "T-020",
        date: "2021-01-20",
        year: 1934,  // Maps to H-020 (SS Independent)
        actualYear: 2021,
        title: "Trump's Pardoning of Steve Bannon",
        description: "In his final hours in office, Trump pardoned his former strategist, who was charged with defrauding donors to a private border wall project.",
        image: "",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-020",
        source: "",
        verified: { image: false, date: true, description: true },
        fallbackIcon: "🗡️"
    }
];

// ============================================
// COMBINE AND EXPORT
// ============================================

const timelineEvents = [...hitlerEvents, ...trumpEvents];

// Helper function to get fallback icon for an event
function getFallbackIcon(event) {
    if (event.fallbackIcon) return event.fallbackIcon;
    if (event.tags && event.tags.length > 0) {
        const firstTag = event.tags[0];
        return FALLBACK_ICONS[firstTag] || "📌";
    }
    return "📌";
}

// Helper function to check if event has image
function hasImage(event) {
    return event.image && event.image !== "";
}

// Log data quality summary
console.log(`📊 Timeline Data Loaded:`);
console.log(`   Total events: ${timelineEvents.length}`);
console.log(`   Hitler events: ${hitlerEvents.length}`);
console.log(`   Trump events: ${trumpEvents.length}`);
console.log(`   Events with images: ${timelineEvents.filter(e => hasImage(e)).length}`);
console.log(`   Events needing images: ${timelineEvents.filter(e => !hasImage(e)).length}`);
console.log(`   Placeholders: ${timelineEvents.filter(e => e.isPlaceholder).length}`);
