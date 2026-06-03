// COSMIC DIVIDE — DATABASE
// Author: SebGIT666

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create/connect to database
const db = new Database(path.join(__dirname, 'cosmic.db'));

// CREATE TABLES
db.exec(`
    CREATE TABLE IF NOT EXISTS habitats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        temperature TEXT,
        danger_level TEXT
    );

    CREATE TABLE IF NOT EXISTS flora (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habitat_id INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        ecosystem_role TEXT,
        FOREIGN KEY (habitat_id) REFERENCES habitats(id)
    );

    CREATE TABLE IF NOT EXISTS fauna (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habitat_id INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        is_guardian INTEGER DEFAULT 0,
        FOREIGN KEY (habitat_id) REFERENCES habitats(id)
    );

    CREATE TABLE IF NOT EXISTS attractions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habitat_id INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        duration TEXT,
        FOREIGN KEY (habitat_id) REFERENCES habitats(id)
    );

    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

//SEED DATA
const habitatCount = db.prepare('SELECT COUNT(*) as count FROM habitats').get();

if (habitatCount.count === 0) {

    const insertHabitat = db.prepare(`
        INSERT INTO habitats (name, description, temperature, danger_level)
        VALUES (?, ?, ?, ?)
    `);

    insertHabitat.run('Inferno Core', 'A vast volcanic landscape of obsidian rock and molten lava rivers.', '2400°C', 'High');
    insertHabitat.run('Azure Abyss', 'A vast bioluminescent ocean warmed by underground lava tunnels from Inferno Core.', '28°C', 'Medium');

    const insertFlora = db.prepare(`
        INSERT INTO flora (habitat_id, name, description, ecosystem_role)
        VALUES (?, ?, ?, ?)
    `);

    // Inferno Flora
    insertFlora.run(1, 'Ignis Ash', 'Monumental obsidian tree with crystalline leaves and lava drip.', 'Heart of the biome — geological stability and thermal energy.');
    insertFlora.run(1, 'Pieris Bamboo', 'Invasive bamboo with metallic stems and glowing golden tips.', 'Communication network — environmental sensor and early warning system.');
    insertFlora.run(1, 'Erica Prime Heater', 'Copper-colored low-growing shrub that stores and radiates heat.', 'Thermal regulator — creates warm paths for fauna migration.');
    insertFlora.run(1, 'Ignis Heath', 'Dense grass with lava-colored flower clusters in red, orange and yellow.', 'Visual camouflage for fauna — regulates surface temperature.');
    insertFlora.run(1, 'Fabiana', 'Obsidian-stemmed plant with bioluminescent orange flowers.', 'Atmospheric filter — purifies toxic gases and releases oxygen.');
    insertFlora.run(1, 'Acer Japonica', 'Compact dense bonsai with red stems and yellow leaves.', 'Isolation gardens — provides cooling micro-islands and shelter.');
    insertFlora.run(1, 'Clerodendrum', 'Globular rolling plant producing berry-like fruits.', 'Electrolyte storage — crucial food source and energy supply.');
    insertFlora.run(1, 'Forsythia Burning Bells', 'Shrub with golden bell-shaped flowers that flash electrostatically.', 'Navigational beacon — signals seismic activity for the Phoenix.');
    insertFlora.run(1, 'Leycesteria Phoenix Berry', 'Shrub with ruby-red berries tasting of metallic grape.', 'Energy booster — allows fauna to survive in toxic zones.');
    insertFlora.run(1, 'Sambucus Sebucus Elder', 'Weeping tree with golden feathery foliage.', 'Provides sanctuary zones — filters volcanic dust from the air.');
    insertFlora.run(1, 'Prime Alium Ignis', 'Spherical plant with a titanium bulb and a star-shaped flower.', 'Biome battery — pulses energy to support neighbouring flora.');
    insertFlora.run(1, 'Sebarylis', 'Large obsidian-gold amaryllis-like plant with cooling properties.', 'Phoenix shelter — creates cooling micro-climates during eruptions.');

    // Abyss Flora
    insertFlora.run(2, 'Acer Azure Deepwielder', 'Giant chemosynthetic seaweed with Japanese maple-shaped leaves glowing azure blue.', 'Keystone species — filters toxic compounds and releases oxygen.');
    insertFlora.run(2, 'Calluna Heather', 'Dense golden-red seaweed colonies growing directly on lava river edges.', 'Lava border guard — thrives where fire meets water.');
    insertFlora.run(2, 'Abyss Cornus', 'Crystalline tree with geometric golden plates instead of leaves.', 'Deep sea lantern — converts thermal energy into guiding light.');
    insertFlora.run(2, 'Danea Abyss', 'Orange creeping plant forming dense carpets near lava streams.', 'Lava tamer — slows magma flow and creates safe foundations.');
    insertFlora.run(2, 'Fuchsiabyss', 'Underwater tree with crimson trunk and cascading azure blue flowers.', 'Forms underwater forests for fauna breeding.');
    insertFlora.run(2, 'Hibiscus Azure Viola Aethel', 'Deep violet leaves with crystal blue bioluminescent flower cups.', 'Natural cooling system — converts heat into blue light and oxygen.');
    insertFlora.run(2, 'Hibiscus Azure Rosa Ignis', 'Neon pink glass-like leaves with golden-red flaming flower cups.', 'Deep architect — directs lava flow and creates safe corridors.');
    insertFlora.run(2, 'Abyss Ilex', 'Miniature crystalline bonsai with sapphire-blue and gold geometric leaves.', 'Planet memory — records geological history in crystal layers.');
    insertFlora.run(2, 'Lavendulla Azure', 'Tall columns with red vein roots and golden crystal flower spikes.', 'Eruption detector — releases golden dust cloud warning.');
    insertFlora.run(2, 'Lupinaussus', 'Woody tree with vertical gradient flower spikes from deep navy to turquoise.', 'Osmotic pump — draws cold water downward to cool volcanic substrate.');
    insertFlora.run(2, 'Azure Nandina', 'Spherical tree with azure outer leaves, gold fruit clusters and crimson new growth.', 'Lungs of the Abyss — neutralises toxic volcanic gases.');
    insertFlora.run(2, 'Borovskia Sage', 'Rigid golden copper stems with deep red flame-like flower spikes.', 'Heat conductor — absorbs excess thermal energy.');
    insertFlora.run(2, 'Sebris Andromeda', 'Layered shrub-tree with scarlet new growth and hanging orange-gold bell flowers.', 'Geological clock — flower colour shifts signal eruption risk.');
    insertFlora.run(2, 'Azalia Sebrina', 'Dense cobalt blue foliage with electric magenta translucent flowers.', 'Oxygen alarm — flowers bleach white when oxygen levels drop.');
    insertFlora.run(2, 'Rhododendron Rex-Abyssi', 'Massive graphite-black leaves with gold undersides and crimson-blue flower clusters.', 'Biological accumulator — stores energy during low volcanic activity.');

    const insertFauna = db.prepare(`
        INSERT INTO fauna (habitat_id, name, description, is_guardian)
        VALUES (?, ?, ?, ?)
    `);

    insertFauna.run(1, 'Ignis Phoenix', 'Lives for 333 years before combusting in the volcanic crater.', 1);
    insertFauna.run(1, 'Magma Drake', 'Giant fire salamander with obsidian black scales and glowing lava cracks.', 0);
    insertFauna.run(1, 'Crystal Wraith', 'Nocturnal bat with metallic glass wings.', 0);
    insertFauna.run(1, 'Ember Crawler', 'Worm that produces geothermal energy.', 0);
    insertFauna.run(2, 'Krakenis', 'Ancient being built from coral and cosmic obsidian.', 1);
    insertFauna.run(2, 'Mind Squid', 'Telepathic squid with 12 tentacles and crystal-like translucent skin.', 0);
    insertFauna.run(2, 'Mood Fish', 'Fish that changes colour reacting to the mood of the observer.', 0);
    insertFauna.run(2, 'Void Whale', 'Massive alien whale that lives in the void between biomes.', 0);
    insertFauna.run(2, 'Glass Shark', 'Shark with a completely transparent body.', 0);

    const insertAttraction = db.prepare(`
        INSERT INTO attractions (habitat_id, name, description, duration)
        VALUES (?, ?, ?, ?)
    `);

    insertAttraction.run(1, 'Magma Gondola', 'Glass pod ride over active lava rivers.', '60 min');
    insertAttraction.run(1, 'Crystal Mine Tour', 'Descent into deep Xenit crystal caves with a guide.', '90 min');
    insertAttraction.run(1, 'Phoenix Watch Platform', 'Glass observation platform 500 metres above the crater.', '45 min');
    insertAttraction.run(1, 'Heat Lab', 'Interactive laboratory exploring geothermal energy.', '30 min');
    insertAttraction.run(1, 'Lava River Cruise', 'Glass boat through underground lava tunnels.', '45 min');
    insertAttraction.run(2, 'Deep Dive Pod', 'Glass sphere diving into the ocean abyss.', '60 min');
    insertAttraction.run(2, 'Crystal Reef Walk', 'Walk along the ocean floor in a hydrosuit.', '90 min');
    insertAttraction.run(2, 'Bioluminescence Night Swim', 'Night swimming among glowing organisms.', '60 min');
    insertAttraction.run(2, 'Mood Fish Aquarium', 'Interactive aquarium where fish react to your emotions.', '30 min');
    insertAttraction.run(2, 'Surface Safari', 'Boat tour across the azure ocean surface with a guide.', '45 min');

    console.log('Database seeded successfully!');
}

export default db;