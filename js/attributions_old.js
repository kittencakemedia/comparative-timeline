// ============================================
// ATTRIBUTION REGISTRY
// Single source of truth for all image attributions
// ============================================

const imageAttributions = {
    // ===== HITLER IMAGES (Public Domain) =====
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp/1508px-Interior-fire-damage-Reichstag-Berlin-Germany-1933.webp.png': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/a/aa/Reichstagsgeb%C3%A4ude_von_Westen.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/2/22/Ernst_R%C3%B6hm_und_Heinrich_Himmler.JPG': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/8/89/Bundesarchiv_Bild_119-1426%2C_Hitler-Putsch%2C_M%C3%BCnchen%2C_Odeonsplatz.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/d/d7/Bundesarchiv_Bild_102-14469%2C_Berlin%2C_Boykott_gegen_j%C3%BCdische_Gesch%C3%A4fte.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler_retouched.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/3/3e/Rassentafel.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/b/be/Bundesarchiv_Bild_146-1970-083-44%2C_Reichskristallnacht%2C_zerst%C3%B6rte_Judengesch%C3%A4ft.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/4/4a/Bundesarchiv_Bild_183-H12478%2C_Wehrmacht%2C_Eid_auf_Adolf_Hitler.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/6/69/Bundesarchiv_Bild_183-H12908%2C_Werner_von_Blomberg.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Bundesarchiv_Bild_183-J14814%2C_Goebbels-Propaganda_f%C3%BCr_den_Totalen_Krieg.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/c/c2/Bundesarchiv_Bild_102-14446%2C_Potsdam%2C_Reichstagsabgeordnete_zur_Reichstagser%C3%B6ffnung.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/5/56/Bundesarchiv_Bild_102-14468%2C_Ausstellung_%22Der_ewige_Jude%22.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/0/02/Bundesarchiv_Bild_102-13774%2C_Joseph_Goebbels.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/Bundesarchiv_Bild_102-14516%2C_Berlin%2C_brennender_Reichstag.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/e/e9/Bundesarchiv_Bild_183-R97512%2C_Wannseekonferenz.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Ernst_R%C3%B6hm%2C_c._1930.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Unknown',
        attribution: 'Public Domain / No attribution required',
        source: 'Wikimedia Commons'
    },

    // ===== TRUMP IMAGES (CC BY-SA) =====
    'https://upload.wikimedia.org/wikipedia/commons/f/f0/Donald_Trump_%2850548277763%29.jpg': {
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        author: 'Gage Skidmore',
        authorUrl: 'https://www.flickr.com/people/22007612@N05',
        attribution: '© Gage Skidmore, CC BY-SA 2.0',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/d/d8/Mike_Pence_by_Gage_Skidmore_4.jpg': {
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        author: 'Gage Skidmore',
        authorUrl: 'https://www.flickr.com/people/22007612@N05',
        attribution: '© Gage Skidmore, CC BY-SA 2.0',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/5/5c/James_Comey_official_portrait.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Federal Bureau of Investigation',
        attribution: 'FBI / Public Domain',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Donald_Trump_announces_his_candidacy.jpg': {
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        author: 'Gage Skidmore',
        authorUrl: 'https://www.flickr.com/people/22007612@N05',
        attribution: '© Gage Skidmore, CC BY-SA 2.0',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/5/5b/Trump_announces_Supreme_Court_nomination_%2850330%29.jpg': {
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        author: 'Gage Skidmore',
        authorUrl: 'https://www.flickr.com/people/22007612@N05',
        attribution: '© Gage Skidmore, CC BY-SA 2.0',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/4/4f/Republican_National_Convention_%28cropped%29.jpg': {
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        author: 'Gage Skidmore',
        authorUrl: 'https://www.flickr.com/people/22007612@N05',
        attribution: '© Gage Skidmore, CC BY-SA 2.0',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/9/92/Trump_Second_Impeachment_Trial_%28515858%29.jpg': {
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        author: 'Gage Skidmore',
        authorUrl: 'https://www.flickr.com/people/22007612@N05',
        attribution: '© Gage Skidmore, CC BY-SA 2.0',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/0/09/FBI_Director_James_Comey_%2831202633510%29.jpg': {
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        author: 'Federal Bureau of Investigation',
        attribution: 'FBI / Public Domain',
        source: 'Wikimedia Commons'
    },
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Donald_Trump_%2848488637162%29.jpg': {
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        author: 'Gage Skidmore',
        authorUrl: 'https://www.flickr.com/people/22007612@N05',
        attribution: '© Gage Skidmore, CC BY-SA 2.0',
        source: 'Wikimedia Commons'
    }
};

// Helper function to get attribution for an image URL
function getAttribution(imageUrl) {
    if (!imageUrl) return null;
    
    // Try exact match first
    if (imageAttributions[imageUrl]) {
        return imageAttributions[imageUrl];
    }
    
    // Try URL without query parameters
    const baseUrl = imageUrl.split('?')[0];
    if (imageAttributions[baseUrl]) {
        return imageAttributions[baseUrl];
    }
    
    // Try partial match (for URLs with different sizes)
    for (const [key, value] of Object.entries(imageAttributions)) {
        if (key.includes('upload.wikimedia.org') && imageUrl.includes(key.split('/').pop())) {
            return value;
        }
    }
    
    return null;
}

// Helper to get all unique attributions from events
function getAllAttributions(events) {
    const uniqueAttributions = new Map();
    
    events.forEach(event => {
        if (event.image && event.image !== '') {
            const att = getAttribution(event.image);
            if (att) {
                const key = JSON.stringify(att);
                if (!uniqueAttributions.has(key)) {
                    uniqueAttributions.set(key, {
                        ...att,
                        events: []
                    });
                }
                const entry = uniqueAttributions.get(key);
                if (!entry.events.includes(event.id)) {
                    entry.events.push(event.id);
                }
            }
        }
    });
    
    return Array.from(uniqueAttributions.values());
}