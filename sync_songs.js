const fs = require('fs');
const path = require('path');

// ==========================================
// PLAYLIST GENERATOR SCRIPT (sync_songs.js)
// Scans the 'audios/' folder and regenerates 'js/tracks.js'
// ==========================================

const AUDIOS_DIR = 'audios';
const OUTPUT_FILE = path.join('js', 'tracks.js');

const KNOWN_METADATA = {
  'nanchaku': {
    title: 'Nanchaku',
    artist: 'Seedhe Maut',
    cover: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400'
  },
  'barbaad': {
    title: 'Barbaad',
    artist: 'Jubin Nautiyal',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400'
  },
  'dhun': {
    title: 'Dhun',
    artist: 'Arijit Singh',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400'
  },
  'pardesiya': {
    title: 'Pardesiya',
    artist: 'Sonu Nigam',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'
  },
  'humsafar': {
    title: 'Humsafar',
    artist: 'Sachet Tandon',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400'
  },
  'tum_ho_toh': {
    title: 'Tum Ho Toh',
    artist: 'Vishal Mishra',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400'
  },
  'kodak': {
    title: 'Kodak',
    artist: 'King, Seedhe Maut',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=400'
  },
  'madira': {
    title: 'Madira',
    artist: 'Seedhe Maut',
    cover: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=400'
  },
  'namastute': {
    title: 'Namastute',
    artist: 'Seedhe Maut',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400'
  }
};

const FALLBACK_COVERS = [
  'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400'
];

function scanTracks() {
  if (!fs.existsSync(AUDIOS_DIR)) {
    console.log(`Directory '${AUDIOS_DIR}' not found. Creating it.`);
    fs.mkdirSync(AUDIOS_DIR);
    return [];
  }

  const tracks = [];
  const files = fs.readdirSync(AUDIOS_DIR).sort();
  
  let coverIdx = 0;
  for (const filename of files) {
    if (path.extname(filename).toLowerCase() !== '.mp3') {
      continue;
    }
    
    const filepath = `audios/${filename}`;
    const baseName = path.basename(filename, '.mp3').trim();
    
    const lookupKey = baseName.toLowerCase();
    let matched = false;
    
    for (const [key, meta] of Object.entries(KNOWN_METADATA)) {
      if (lookupKey.includes(key)) {
        tracks.push({
          title: meta.title,
          artist: meta.artist,
          src: filepath,
          cover: meta.cover
        });
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      let title = baseName;
      let artist = 'Independent Artist';
      
      if (baseName.includes(' - ')) {
        const parts = baseName.split(' - ');
        artist = parts[0].trim();
        title = parts[1].trim();
      } else if (baseName.includes('-')) {
        const parts = baseName.split('-');
        artist = parts[0].trim();
        title = parts[1].trim();
      }
      
      const formatString = (str) => {
        return str
          .replace(/_/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      };
      
      tracks.push({
        title: formatString(title),
        artist: formatString(artist),
        src: filepath,
        cover: FALLBACK_COVERS[coverIdx % FALLBACK_COVERS.length]
      });
      coverIdx++;
    }
  }
  
  return tracks;
}

function main() {
  console.log("Scanning 'audios/' folder...");
  const tracks = scanTracks();
  
  if (tracks.length === 0) {
    console.log("No .mp3 files found in 'audios/' directory.");
    return;
  }
  
  const jsContent = `/* ==========================================
   TRACKS LIST - SUNIL PORTFOLIO (pikslnet)
   Auto-generated playlist items from 'audios/' folder.
   Generated via Node.js automation.
   ========================================== */

const myTracks = ${JSON.stringify(tracks, null, 2)};
`;

  fs.mkdirSync('js', { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf-8');
  console.log(`Success: Registered ${tracks.length} songs inside '${OUTPUT_FILE}'!`);
}

main();
