import os
import json

# ==========================================
# PLAYLIST GENERATOR SCRIPT (sync_songs.py)
# Scans the 'audios/' folder and regenerates 'js/tracks.js'
# ==========================================

AUDIOS_DIR = "audios"
OUTPUT_FILE = os.path.join("js", "tracks.js")

# Known song metadata database for perfect parsing of your existing playlist
KNOWN_METADATA = {
    "nanchaku": {
        "title": "Nanchaku",
        "artist": "Seedhe Maut",
        "cover": "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400"
    },
    "barbaad": {
        "title": "Barbaad",
        "artist": "Jubin Nautiyal",
        "cover": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400"
    },
    "dhun": {
        "title": "Dhun",
        "artist": "Arijit Singh",
        "cover": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400"
    },
    "pardesiya": {
        "title": "Pardesiya",
        "artist": "Sonu Nigam",
        "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
    },
    "humsafar": {
        "title": "Humsafar",
        "artist": "Sachet Tandon",
        "cover": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400"
    },
    "tum_ho_toh": {
        "title": "Tum Ho Toh",
        "artist": "Vishal Mishra",
        "cover": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400"
    },
    "kodak": {
        "title": "Kodak",
        "artist": "King, Seedhe Maut",
        "cover": "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=400"
    },
    "madira": {
        "title": "Madira",
        "artist": "Seedhe Maut",
        "cover": "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=400"
    },
    "namastute": {
        "title": "Namastute",
        "artist": "Seedhe Maut",
        "cover": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400"
    }
}

# General royalty-free cover arts loop for new custom tracks
FALLBACK_COVERS = [
    "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400"
]

def scan_tracks():
    if not os.path.exists(AUDIOS_DIR):
        print(f"Error: '{AUDIOS_DIR}' folder not found. Creating it.")
        os.makedirs(AUDIOS_DIR)
        return []

    tracks = []
    files = sorted(os.listdir(AUDIOS_DIR))
    
    cover_idx = 0
    for filename in files:
        if not filename.lower().endswith(".mp3"):
            continue
            
        filepath = os.path.join(AUDIOS_DIR, filename).replace("\\", "/")
        base_name = os.path.splitext(filename)[0].strip()
        
        # Check if it matches a known track
        lookup_key = base_name.lower()
        matched = False
        
        for key, meta in KNOWN_METADATA.items():
            if key in lookup_key:
                tracks.append({
                    "title": meta["title"],
                    "artist": meta["artist"],
                    "src": filepath,
                    "cover": meta["cover"]
                })
                matched = True
                break
                
        if not matched:
            # Parse custom filename
            title = base_name
            artist = "Independent Artist"
            
            # If name has a dash split it
            if " - " in base_name:
                parts = base_name.split(" - ", 1)
                artist = parts[0].strip()
                title = parts[1].strip()
            elif "-" in base_name:
                parts = base_name.split("-", 1)
                artist = parts[0].strip()
                title = parts[1].strip()
                
            # Clean up title
            title = title.replace("_", " ").replace("  ", " ").strip().title()
            artist = artist.replace("_", " ").replace("  ", " ").strip().title()
            
            tracks.append({
                "title": title,
                "artist": artist,
                "src": filepath,
                "cover": FALLBACK_COVERS[cover_idx % len(FALLBACK_COVERS)]
            })
            cover_idx += 1
            
    return tracks

def main():
    print("Scanning 'audios/' folder for tracks...")
    tracks = scan_tracks()
    
    if not tracks:
        print("No .mp3 songs found in 'audios/' directory.")
        return

    # Generate tracks.js contents
    js_content = f"""/* ==========================================
   TRACKS LIST - SUNIL PORTFOLIO (pikslnet)
   Auto-generated playlist items from 'audios/' folder.
   Generated on: 2026
   ========================================== */

const myTracks = {json.dumps(tracks, indent=2)};
"""
    
    # Ensure js directory exists
    os.makedirs("js", exist_ok=True)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Success: Registered {len(tracks)} songs inside '{OUTPUT_FILE}'!")

if __name__ == "__main__":
    main()
