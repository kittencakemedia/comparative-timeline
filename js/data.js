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
        image: "https://live.staticflickr.com/65535/53710898197_306c7177dd_m.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bundesarchiv_Bild_119-1426%2C_Hitler-Putsch%2C_M%C3%BCnchen%2C_Odeonsplatz.jpg/120px-Bundesarchiv_Bild_119-1426%2C_Hitler-Putsch%2C_M%C3%BCnchen%2C_Odeonsplatz.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20190710013849",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Judenboykott_1933-04_Anti-Semitic_Nazi_boycott_of_Jewish_businesses_shops_Berlin_SA_Sturmabteilung_propaganda_terror_action_Kauft_nicht_bei_Juden_Closed_entrance_Tietz_Department_Store_Posters_BrownshirNarodowe_Archiwum_Cyfrowe_3_1_0_17.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Propaganda_poster_for_Adolf_Hitler%2C_1943%2C_Deutsches_Historisches_Museum%2C_Berlin_%2840202704661%29.jpg/120px-Propaganda_poster_for_Adolf_Hitler%2C_1943%2C_Deutsches_Historisches_Museum%2C_Berlin_%2840202704661%29.jpg?_=20180605203615",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/1/13/N%C3%BCrnberger_Gesetze_vom_15_September_1935_Reichsb%C3%BCrgergesetz_Schutze_des_deutschen_Blutes_Antisemitic_Nuremberg_Laws_in_Nazi_Germany_depriving_Jews_of_rights_Book_N%C3%BCrnberglovene._Holocaust_exhibition_HL-senteret_Norway_%282021%29_04.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/B%C3%B6rnerplatz_synagogue_burning_-_Kristallnacht_1938-11-10.png/120px-B%C3%B6rnerplatz_synagogue_burning_-_Kristallnacht_1938-11-10.png?_=20220713021255",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/3_1_0_17_12495_13_1_34575_Erster_Mai_Der_Feiertag_der_nationalen_Arbeit_May_Day_Celebrations_Berlin_Nazi_Germany_1933-05-01_Oath-taking_on_Nazi_banners_at_bayerische_Platz_Nazi_salutes_SA_Sturmabteilung_%28Keystone_View_Co%29_Narodowe_Arch.jpg/120px-thumbnail.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20260509100541",
        video: "",
        position: "top",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "T-009",
        source: "Wikimedia Commons",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-010",
        date: "1938-02-04",
        year: 1938,
        title: "Reorganization of the Armed Forces High Command",
        description: "Hitler removes key conservative generals opposed to his aggressive foreign policy and places the armed forces directly under his personal command.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Organisationsbuc00nati_0_orig_0605_ORGANISATIONSBUCH_DER_NSDAP_1943_Tafel_43_Nationalsoz._Kraftfahrkorps_NSKK_Uniform_Sturmmann_im_grossen_Dienstanzug_mit_Sturzhelm_Sturmf%C3%BChrer_im_Stave_der_Motorbootstandarte_Public_domain_Cropped.jpg/120px-thumbnail.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20200419123426",
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
        image: "https://live.staticflickr.com/739/20415094828_7e4318801d_b.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Freiburg_-_Kornhaus.jpg/120px-Freiburg_-_Kornhaus.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20080216163243",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RGBL_I_1933_S_0175.png/120px-RGBL_I_1933_S_0175.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20070522233453",
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
        image: "https://live.staticflickr.com/7683/17095675942_e9701858fa_n.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/RGBl_1934_1_75.jpg/120px-RGBl_1934_1_75.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20161105151439",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Bundesarchiv_Bild_183-B24543%2C_Hauptquartier_Heeresgruppe_S%C3%BCd%2C_Lagebesprechung.jpg/120px-Bundesarchiv_Bild_183-B24543%2C_Hauptquartier_Heeresgruppe_S%C3%BCd%2C_Lagebesprechung.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20241022164708",
        video: "",
        position: "top",
        type: "bigrect",
        tags: ["Emergency Powers & Crisis Exploitation"],
        mappedTo: "T-016",
        source: "Wikimedia Commons",
        verified: { image: true, date: true, description: true }
    },
    {
        id: "H-017",
        date: "1938-06-22",
        year: 1938,
        title: "Requirement to Register Jewish Wealth",
        description: "A decree forcing Jews to register all property and assets above a certain value, a prelude to state confiscation ('Aryanization').",
        image: "https://api.openverse.org/v1/images/c7595e45-ce43-4491-ac71-a3bc6b286ddd/thumb/",
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
        image: "https://live.staticflickr.com/65535/52641275514_9640cf338d_n.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/b/b7/20200702053501%21Bundesarchiv_Bild_183-S38324%2C_Tag_von_Potsdam%2C_Adolf_Hitler%2C_Paul_v._Hindenburg.jpg/120px-Bundesarchiv_Bild_183-S38324%2C_Tag_von_Potsdam%2C_Adolf_Hitler%2C_Paul_v._Hindenburg.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
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
        image: "https://live.staticflickr.com/2462/3814951465_47272ff754_n.jpg",
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
        image: "https://live.staticflickr.com/5731/20522549794_956a41efa0_n.jpg",
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
        image: "https://api.openverse.org/v1/images/b9558e1a-7516-4278-9310-adf08284ac29/thumb/",
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
        image: "https://api.openverse.org/v1/images/723a2450-6d1c-45cf-8450-38cadc20eb77/thumb/",  // NEEDS UNIQUE IMAGE
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Cult of Personality & Mass Mobilization"],
        mappedTo: "H-006",
        source: "USHMM",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "👤✨"
    },
    {
        id: "T-007",
        date: "2017-08-15",
        year: 1935,  // Maps to H-007 (Nuremberg Laws)
        actualYear: 2017,
        title: "Trump's 'Very Fine People' Comment",
        description: "After the 'Unite the Right' rally in Charlottesville, Trump said there were 'very fine people on both sides,' equating white supremacists with counter-protesters.",
        image: "https://live.staticflickr.com/65535/50267378136_c50b76ec22_n.jpg",
        video: "",
        position: "bottom",
        type: "star",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "H-007",
        source: "USHMM",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "👑"
    },
    {
        id: "T-008",
        date: "2020-09-29",
        year: 1938,  // Maps to H-008 (Kristallnacht)
        actualYear: 2020,
        title: "Trump's 'Stand Back and Stand By' Comment",
        description: "During a presidential debate, when asked to condemn white supremacists, Trump told the Proud Boys to 'stand back and stand by.'",
        image: "https://api.openverse.org/v1/images/8becb696-ee5e-4457-985a-805fc4179703/thumb/",
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["State-Sanctioned Violence & Intimidation"],
        mappedTo: "H-008",
        source: "Britannica",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "💥"
    },
    {
        id: "T-009",
        date: "2017-05-11",
        year: 1934,  // Maps to H-009 (Mass Oath)
        actualYear: 2017,
        title: "Trump's Demand for Loyalty from FBI Director",
        description: "In a meeting with Director James Comey, President Trump reportedly said, 'I need loyalty, I expect loyalty.'",
        image: "https://live.staticflickr.com/5810/21134663472_c11bc28666_b.jpg",
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-009",
        source: "Britannica",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "🗡️"
    },
    {
        id: "T-010",
        date: "2020-11-09",
        year: 1938,  // Maps to H-010 (Reorganization)
        actualYear: 2020,
        title: "Trump's Firing of Defense Secretary Esper",
        description: "President Trump fires Secretary of Defense Mark Esper via tweet after Esper publicly opposed using active-duty troops for domestic law enforcement.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Dr._Mark_T._Esper_%E2%80%93_Secretary_of_Defense.jpg/120px-Dr._Mark_T._Esper_%E2%80%93_Secretary_of_Defense.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20190624123135",
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-010",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "🗡️"
    },
    {
        id: "T-011",
        date: "2020-04-28",
        year: 1944,  // Maps to H-011 (Total War)
        actualYear: 2020,
        title: "Trump's Use of Defense Production Act for Meat Plants",
        description: "President Trump uses the Defense Production Act to order meat processing plants to remain open during the COVID-19 pandemic, prioritizing supply chains over public health.",
        image: "https://api.openverse.org/v1/images/9fdc9c99-1508-48d0-9dbf-80ac2dbd8e43/thumb/",
        video: "",
        position: "bottom",
        type: "bigrect",
        tags: ["Emergency Powers & Crisis Exploitation"],
        mappedTo: "H-011",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "⚡"
    },
    {
        id: "T-012",
        date: "2020-09-21",
        year: 1933,  // Maps to H-012 (Gleichschaltung)
        actualYear: 2020,
        title: "Trump's Threats to De-Fund 'Anarchist Jurisdictions'",
        description: "The Trump administration moves to cut federal funding to cities like New York and Portland, citing their leadership and protest activity.",
        image: "https://live.staticflickr.com/1900/42876031140_7b725de3fc_b.jpg",
        video: "",
        position: "bottom",
        type: "diamond",
        tags: ["Legal Manipulation & Institutional Capture"],
        mappedTo: "H-012",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "⚖️❌"
    },
    {
        id: "T-013",
        date: "2020-10-21",
        year: 1933,  // Maps to H-013 (Civil Service Law)
        actualYear: 2020,
        title: "Trump's Creation of 'Schedule F' Executive Order",
        description: "This executive order reclassified many federal civil service roles as political appointments, making it easier to fire career officials.",
        image: "https://live.staticflickr.com/843/42736848235_9f344fcf2f_b.jpg",
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-013",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "🗡️"
    },
    {
        id: "T-014",
        date: "2020-11-02",
        year: 1933,  // Maps to H-014 (Propaganda Ministry)
        actualYear: 2020,
        title: "Trump's Creation of the '1776 Commission'",
        description: "Established to promote 'patriotic education,' this commission was widely seen as an attempt to create a state-sanctioned, partisan narrative of American history.",
        image: "https://live.staticflickr.com/65535/53001407461_8f57eb4698_b.jpg",
        video: "",
        position: "bottom",
        type: "star",
        tags: ["Propaganda & Media Control"],
        mappedTo: "H-014",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "📢"
    },
    {
        id: "T-015",
        date: "2025-06-05",
        year: 1934,
        actualYear: 2024,
        title: "Unitary Executive Theory and Executive Orders on Immigration",
        description: "The Trump administration's contention that the president has absolute control over the executive branch/independent federal agencies, and demanded that state and local law enforcement assist in its federal immigration enforcement efforts.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/President_Donald_Trump_signing_executive_orders_%2803%29.jpg/120px-President_Donald_Trump_signing_executive_orders_%2803%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20250121133530",
        video: "",
        position: "bottom",
        type: "rect",
        tags: ["Legal Manipulation & Institutional Capture"],
        mappedTo: "H-015",
        source: "",
        verified: { image: true, date: true, description: true },
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
        image: "https://live.staticflickr.com/65535/49949833163_1eab0e968d_b.jpg",
        video: "",
        position: "bottom",
        type: "star",
        tags: ["State-Sanctioned Violence & Intimidation"],
        mappedTo: "H-016",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "💥"
    },
    {
        id: "T-017",
        date: "2015-11-21",
        year: 1938,  // Maps to H-017 (Register Jewish Wealth)
        actualYear: 2015,
        title: "Trump's Proposal to Surveil Mosques",
        description: "During his campaign, Trump stated he would implement surveillance of certain mosques and a database for Syrian refugees.",
        image: "https://live.staticflickr.com/2407/5694563549_6c4b431e07_b.jpg",
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["Surveillance & Internal Policing"],
        mappedTo: "H-017",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "👁️"
    },
    {
        id: "T-018",
        date: "2025-07-01",
        year: 1942,
        actualYear: 2025,
        title: "Big Beautiful Bill Act",
        description: "Congress approves $170 billion spending package that turns Immigration and Customs Enforcement (ICE) into the largest federal law enforcement agency.",
        image: "https://live.staticflickr.com/65535/54617783749_04138f6575_n.jpg",
        video: "",
        position: "bottom",
        type: "smallrect",
        tags: ["Authoritarian Ideology & Nationalism"],
        mappedTo: "H-018",
        source: "",
        verified: { image: true, date: true, description: true },
        isPlaceholder: true,
        fallbackIcon: "👑"
    },
    {
        id: "T-019",
        date: "2017-01-21",
        year: 1933,  // Maps to H-019 (Law Against New Parties)
        actualYear: 2017,
        title: "Trump's 'Enemy of the People' Rhetoric",
        description: "President Trump repeatedly refers to the news media as 'the enemy of the American people,' seeking to discredit a key institution of democratic accountability.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Freedom_of_Speech_Includes_The_Press_%2832451481695%29.jpg/120px-Freedom_of_Speech_Includes_The_Press_%2832451481695%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20170123023319",
        video: "",
        position: "bottom",
        type: "diamond",
        tags: ["Propaganda & Media Control"],
        mappedTo: "H-019",
        source: "",
        verified: { image: true, date: true, description: true },
        fallbackIcon: "📢"
    },
    {
        id: "T-020",
        date: "2021-01-20",
        year: 1934,  // Maps to H-020 (SS Independent)
        actualYear: 2021,
        title: "Trump's Pardoning of Steve Bannon",
        description: "In his final hours in office, Trump pardoned his former strategist, who was charged with defrauding donors to a private border wall project.",
        image: "https://live.staticflickr.com/65535/52588161301_0acd37a5d7_n.jpg",
        video: "",
        position: "bottom",
        type: "circle",
        tags: ["Loyalty Purges & Political Patronage"],
        mappedTo: "H-020",
        source: "",
        verified: { image: true, date: true, description: true },
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

