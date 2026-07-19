const fs = require('fs');
const path = require('path');

// ==========================================
// GLOBAL ASSETS SYNC TOOL (sync.js)
// Scans 'audios/', 'portfolio/', and 'images/' folders
// Regenerates 'js/tracks.js' and 'js/projects.js'
// Handles 'portfolio_config.json' overrides
// ==========================================

const AUDIOS_DIR = 'audios';
const PORTFOLIO_DIR = 'portfolio';
const IMAGES_DIR = 'images';

const TRACKS_FILE = path.join('js', 'tracks.js');
const PROJECTS_FILE = path.join('js', 'projects.js');
const PORTFOLIO_CONFIG_FILE = 'portfolio_config.json';
const MUSIC_CONFIG_FILE = 'music_config.json';

function loadMusicConfig() {
  if (fs.existsSync(MUSIC_CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MUSIC_CONFIG_FILE, 'utf-8'));
    } catch (e) {
      console.error('-> Error parsing music_config.json, using defaults.', e);
    }
  }
  return null;
}

function saveMusicConfig(config) {
  fs.writeFileSync(MUSIC_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

const KNOWN_AUDIO = {
  'nanchaku': {
    title: 'Nanchaku',
    artist: 'Seedhe Maut',
  },
  'barbaad': {
    title: 'Barbaad',
    artist: 'Jubin Nautiyal',
  },
  'dhun': {
    title: 'Dhun',
    artist: 'Arijit Singh',
  },
  'pardesiya': {
    title: 'Pardesiya',
    artist: 'Sonu Nigam',
  },
  'humsafar': {
    title: 'Humsafar',
    artist: 'Sachet Tandon',
  },
  'tum_ho_toh': {
    title: 'Tum Ho Toh',
    artist: 'Vishal Mishra',
  },
  'kodak': {
    title: 'Kodak',
    artist: 'King, Seedhe Maut',
  },
  'madira': {
    title: 'Madira',
    artist: 'Seedhe Maut',
  },
  'namastute': {
    title: 'Namastute',
    artist: 'Seedhe Maut',
  }
};

const KNOWN_PORTFOLIO = {
  '7cc jersey': {
    title: '7cc Esports Jersey',
    category: 'branding',
    desc: 'A premium sub-dyed esports jersey design featuring aggressive neon striping and clean branding placements.'
  },
  '7ss croster': {
    title: '7ss Roster Release',
    category: 'social',
    desc: 'A stylized team roster announcement graphic built with glowing player cards and future-tech borders.'
  },
  'kj broky playtzz': {
    title: 'KJ Broky Highlights',
    category: 'gaming',
    desc: 'Esports thumbnail design with highly saturated brush strokes, custom text styles, and game art integration.'
  },
  'some crazy gameplay': {
    title: 'Crazy Gameplay',
    category: 'gaming',
    desc: 'High-contrast action thumbnail layout engineered to capture attention and boost video click-through rates.'
  },
  'birthday stream': {
    title: 'Birthday Stream Overlay',
    category: 'social',
    desc: 'Special event stream layout featuring celebratory glowing particle effects and custom social channel alerts.'
  },
  'compressd': {
    title: 'Compressed Artwork',
    category: 'branding',
    desc: 'A minimal background study exploring dark gradients, digital grain textures, and neon highlights.'
  },
  'gekko 1': {
    title: 'Gekko Neon Vector',
    category: 'branding',
    desc: 'Clean flat vector tracing of Gekko illustration from Valorant, layered with high-contrast glowing elements.'
  },
  'gekko purple': {
    title: 'Gekko Purple Edition',
    category: 'branding',
    desc: 'An alternative color grading study of Gekko, utilizing vibrant purples and deep magenta overlays.'
  },
  'gfx profile': {
    title: 'GFX Profile Artwork',
    category: 'branding',
    desc: 'Personal branding avatar design combining sci-fi HUD elements with a stylized initials monogram.'
  },
  'good or bad': {
    title: 'Good or Bad Logo',
    category: 'branding',
    desc: 'Symmetric vector monogram design with custom curves, optimized for high-end clothing and print.'
  },
  'insane ace': {
    title: 'Insane Ace Stream Layout',
    category: 'social',
    desc: 'Esports overlay pack featuring sleek streaming interfaces, modular chat panels, and system alerts.'
  },
  'iso cant sleep': {
    title: 'Iso Cant Sleep',
    category: 'gaming',
    desc: 'Cinematic thumbnail art integrating Iso character model with custom typography and ambient lighting.'
  },
  'jett w': {
    title: 'Jett Windlash',
    category: 'gaming',
    desc: 'High energy thumbnail graphic featuring Jett with color-matched atmospheric effects and 3D lettering.'
  },
  'jett keep matching': {
    title: 'Jett Keep Matching',
    category: 'gaming',
    desc: 'Esports highlights cover art showing intense Jett visual grading and particle motion effects.'
  },
  'lakshya 1': {
    title: 'Lakshya Gaming Header',
    category: 'social',
    desc: 'Custom banners tailored for esports creators, highlighting team branding and social credentials.'
  },
  'purple thme': {
    title: 'Purple Tech Study',
    category: 'branding',
    desc: 'A stylized brand concept board focusing on purple neon lighting, space grids, and tech layouts.'
  },
  'solo 5 kills erangle yt any': {
    title: 'Solo Erangel 5 Kills',
    category: 'gaming',
    desc: 'Erangel battle highlights thumbnail showcasing custom typography overlays and atmospheric grading.'
  },
  'solo 7 kills miramar yt': {
    title: 'Solo Miramar 7 Kills',
    category: 'gaming',
    desc: 'Solo Miramar combat highlights thumbnail utilizing strong yellow lettering and character backlighting.'
  },
  'speed thrills': {
    title: 'Speed Thrills Art',
    category: 'branding',
    desc: 'A fast-paced neon typographic graphic exploring speed lines, italics, and energetic cyan glows.'
  },
  'sunday fun stream': {
    title: 'Sunday Fun Stream Banner',
    category: 'social',
    desc: 'YouTube gaming stream thumbnail featuring high-vibe character illustrations and bold overlays.'
  },
  'tejo 2': {
    title: 'Tejo Character Concept',
    category: 'gaming',
    desc: 'Valorant style character grading study with high saturation details and neon stroke lines.'
  },
  'the most underrated player': {
    title: 'Underrated Player Spotlight',
    category: 'gaming',
    desc: 'Highlight thumbnail utilizing central character scale, radial light rays, and high-impact custom font.'
  },
  'thumbnail yellow brocky 2': {
    title: 'Yellow Brocky Thumbnail',
    category: 'gaming',
    desc: 'Esports action thumbnail integrating custom gaming models, textured texturing, and yellow neon halos.'
  },
  'update 3.3': {
    title: 'Update Patch Notes',
    category: 'social',
    desc: 'Esports event patch update graphic designed to display notes in a clean, legible cyber list format.'
  }
};

const FALLBACK_COVERS = [
  'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400'
];

function loadPortfolioConfig() {
  if (fs.existsSync(PORTFOLIO_CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PORTFOLIO_CONFIG_FILE, 'utf-8'));
    } catch (e) {
      console.error('-> Error parsing portfolio_config.json, using defaults.', e);
    }
  }
  return null;
}

function savePortfolioConfig(config) {
  fs.writeFileSync(PORTFOLIO_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

function findLocalCover(songTitle) {
  if (!fs.existsSync(IMAGES_DIR)) {
    return null;
  }
  
  const titleKey = songTitle.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ').trim();
  const imageFiles = fs.readdirSync(IMAGES_DIR);
  
  // 1. Direct contains check
  for (const filename of imageFiles) {
    const ext = path.extname(filename).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }
    const normalizedFilename = filename.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ');
    if (normalizedFilename.includes(titleKey)) {
      return `images/${filename}`;
    }
  }
  
  // 2. Word-by-word title match check
  const titleWords = titleKey.split(' ').filter(w => w.length > 2);
  for (const filename of imageFiles) {
    const ext = path.extname(filename).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }
    const normalizedFilename = filename.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ');
    if (titleWords.some(w => normalizedFilename.includes(w))) {
      return `images/${filename}`;
    }
  }
  
  // 3. Defaults check
  if (imageFiles.includes('default.jpg')) {
    return 'images/default.jpg';
  } else if (imageFiles.includes('default.png')) {
    return 'images/default.png';
  }
  
  return null;
}

function syncAudios() {
  if (!fs.existsSync(AUDIOS_DIR)) {
    fs.mkdirSync(AUDIOS_DIR);
    return;
  }

  const tracks = [];
  const files = fs.readdirSync(AUDIOS_DIR).sort();
  
  // Load config overrides
  let musicConfig = loadMusicConfig() || {};
  let configUpdated = false;

  let coverIdx = 0;
  for (const filename of files) {
    if (path.extname(filename).toLowerCase() !== '.mp3') {
      continue;
    }
    
    const filepath = `audios/${filename}`;
    const baseName = path.basename(filename, '.mp3').trim();
    const lookupKey = baseName.toLowerCase();
    
    let title = baseName;
    let artist = 'Independent Artist';
    let playlist = 'bollywood'; // default playlist
    
    // Auto-categorize playlist based on filename/artist keywords
    const hiphopKeywords = ['seedhe', 'maut', 'rap', 'hiphop', 'trap', 'king', 'krishna', 'krsna', 'nanchaku', 'namastute', 'kodak', 'madira'];
    const lofiKeywords = ['lofi', 'chill', 'sleep', 'slowed', 'reverb', 'acoustic', 'bethu', 'tum ho', 'humsafar', 'likhne'];
    
    let hasHiphop = hiphopKeywords.some(kw => lookupKey.includes(kw));
    let hasLofi = lofiKeywords.some(kw => lookupKey.includes(kw));
    
    if (hasHiphop) {
      playlist = 'hiphop';
    } else if (hasLofi) {
      playlist = 'lofi';
    }

    // Determine default title/artist using known database
    let matched = false;
    for (const [key, meta] of Object.entries(KNOWN_AUDIO)) {
      if (lookupKey.includes(key)) {
        title = meta.title;
        artist = meta.artist;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      if (baseName.includes(' - ')) {
        const parts = baseName.split(' - ');
        artist = parts[0].trim().replace(/_/g, ' ');
        title = parts[1].trim().replace(/_/g, ' ');
      } else if (baseName.includes('-')) {
        const parts = baseName.split('-');
        artist = parts[0].trim().replace(/_/g, ' ');
        title = parts[1].trim().replace(/_/g, ' ');
      } else {
        title = baseName.replace(/_/g, ' ');
      }
      
      const formatString = (str) => {
        return str
          .trim()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      };
      
      title = formatString(title);
      artist = formatString(artist);
    }
    
    const localCover = findLocalCover(title);
    const coverArt = localCover ? localCover : FALLBACK_COVERS[coverIdx % FALLBACK_COVERS.length];

    // Check config overrides
    if (musicConfig[filename]) {
      const overrides = musicConfig[filename];
      title = overrides.title || title;
      artist = overrides.artist || artist;
      playlist = overrides.playlist || playlist;
      const finalCover = overrides.cover || coverArt;
      
      tracks.push({
        title: title,
        artist: artist,
        src: filepath,
        cover: finalCover,
        playlist: playlist
      });
    } else {
      // Add missing song to configuration to make it customizable
      musicConfig[filename] = {
        title: title,
        artist: artist,
        playlist: playlist,
        cover: coverArt
      };
      configUpdated = true;

      tracks.push({
        title: title,
        artist: artist,
        src: filepath,
        cover: coverArt,
        playlist: playlist
      });
    }
    coverIdx++;
  }

  // Save config overrides back to disk
  saveMusicConfig(musicConfig);

  fs.mkdirSync('js', { recursive: true });
  const jsContent = `/* ==========================================\n   TRACKS LIST - AUTO-GENERATED\n   ========================================== */\n\nconst myTracks = ${JSON.stringify(tracks, null, 2)};\n`;
  fs.writeFileSync(TRACKS_FILE, jsContent, 'utf-8');
  console.log(`-> Audio Sync: Registered ${tracks.length} songs inside '${TRACKS_FILE}'`);
}

function syncPortfolio() {
  if (!fs.existsSync(PORTFOLIO_DIR)) {
    fs.mkdirSync(PORTFOLIO_DIR);
    return;
  }

  const projects = [];
  const files = fs.readdirSync(PORTFOLIO_DIR).sort();
  
  // Load existing config mapping or initialize new one
  let config = loadPortfolioConfig() || {};
  let updatedConfig = {};
  
  for (const filename of files) {
    const ext = path.extname(filename).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }
    
    if (filename.toLowerCase().includes('- copy')) {
      continue;
    }
    
    const filepath = `portfolio/${filename}`;
    const baseName = path.basename(filename, ext).trim();
    const lookupKey = baseName.toLowerCase();
    
    // If this file already exists in config, use the saved properties!
    if (config[filename]) {
      projects.push({
        title: config[filename].title,
        category: config[filename].category,
        img: filepath,
        desc: config[filename].desc
      });
      updatedConfig[filename] = config[filename];
      continue;
    }
    
    // Otherwise, execute auto-detection keywords logic
    let matched = false;
    let title = baseName;
    let category = 'branding'; // default
    let desc = '';
    
    // 1. Check known designs database overrides
    for (const [key, meta] of Object.entries(KNOWN_PORTFOLIO)) {
      if (lookupKey.includes(key)) {
        title = meta.title;
        category = meta.category;
        desc = meta.desc;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      // 2. Run expanded keyword categorizer
      const socialKws = ['stream', 'banner', 'overlay', 'birthday', 'roster', 'croster', 'release', 'patch', 'update', 'thumbnail', 'youtube', 'yt', 'header', 'channel', 'social', 'media'];
      const gamingKws = ['gameplay', 'kill', 'kills', 'ace', 'playtzz', 'highlights', 'jett', 'brocky', 'underrated', 'erangle', 'miramar', 'speed', 'thrills', 'iso', 'sleep', 'gaming', 'game', 'valorant', 'pubg', 'bgmi', 'csgo', 'cs2'];
      const uiuxKws = ['website', 'web', 'app', 'application', 'ui', 'ux', 'dashboard', 'uiux', 'concept', 'landing', 'interface', 'hud', 'figma', 'mockup'];
      const brandingKws = ['jersey', 'logo', 'branding', 'theme', 'gekko', 'gfx', 'profile', 'bad', 'compressd', 'vector', 'identity', 'typography', 'monogram', 'apparel'];
      
      if (uiuxKws.some(kw => lookupKey.includes(kw))) {
        category = 'ui';
      } else if (gamingKws.some(kw => lookupKey.includes(kw))) {
        category = 'gaming';
      } else if (socialKws.some(kw => lookupKey.includes(kw))) {
        category = 'social';
      } else if (brandingKws.some(kw => lookupKey.includes(kw))) {
        category = 'branding';
      }
      
      const formatString = (str) => {
        return str
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      };
      
      title = formatString(title);
      
      if (category === 'ui') {
        desc = 'User interface mockup designed for responsive screen layouts, focus screens, and dynamic components.';
      } else if (category === 'gaming') {
        desc = 'Esports high-quality custom thumbnail graphic highlighting gaming content and stylized character design.';
      } else if (category === 'social') {
        desc = 'Stream layout banner overlay customized for social broadcast channels and social media announcements.';
      } else {
        desc = 'Premium custom vector branding identity study for tech and esports organizations.';
      }
    }
    
    projects.push({
      title: title,
      category: category,
      img: filepath,
      desc: desc
    });
    
    // Add dynamically detected values to config record
    updatedConfig[filename] = {
      title: title,
      category: category,
      desc: desc
    };
  }

  // Keep any old config records that were missing from physical folder scanning (to avoid loss of work)
  for (const [filename, value] of Object.entries(config)) {
    if (!updatedConfig[filename]) {
      updatedConfig[filename] = value;
    }
  }

  // Save config
  savePortfolioConfig(updatedConfig);

  // Write projects.js
  fs.mkdirSync('js', { recursive: true });
  const jsContent = `/* ==========================================\n   PORTFOLIO ITEMS - AUTO-GENERATED\n   ========================================== */\n\nconst myProjects = ${JSON.stringify(projects, null, 2)};\n`;
  fs.writeFileSync(PROJECTS_FILE, jsContent, 'utf-8');
  console.log(`-> Portfolio Sync: Registered ${projects.length} works inside '${PROJECTS_FILE}'`);
  console.log(`-> Metadata Configuration updated inside '${PORTFOLIO_CONFIG_FILE}'`);
}

function main() {
  console.log('==========================================');
  console.log('Running Sunil Portfolio Asset Sync...');
  console.log('==========================================');
  syncAudios();
  syncPortfolio();
  console.log('All tasks finished successfully!');
}

main();
