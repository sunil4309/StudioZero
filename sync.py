import os
import json

# ==========================================
# GLOBAL ASSETS SYNC TOOL (sync.py)
# Scans 'audios/', 'portfolio/', and 'images/' folders
# Regenerates 'js/tracks.js' and 'js/projects.js'
# Handles 'portfolio_config.json' overrides
# ==========================================

AUDIOS_DIR = "audios"
PORTFOLIO_DIR = "portfolio"
IMAGES_DIR = "images"

TRACKS_FILE = os.path.join("js", "tracks.js")
PROJECTS_FILE = os.path.join("js", "projects.js")
PORTFOLIO_CONFIG_FILE = "portfolio_config.json"
MUSIC_CONFIG_FILE = "music_config.json"

def load_music_config():
    if os.path.exists(MUSIC_CONFIG_FILE):
        try:
            with open(MUSIC_CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print("-> Error parsing music_config.json, using defaults:", e)
    return None

def save_music_config(config):
    with open(MUSIC_CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

# Known song metadata database for perfect parsing of your existing playlist
KNOWN_AUDIO = {
    "nanchaku": {
        "title": "Nanchaku",
        "artist": "Seedhe Maut",
    },
    "barbaad": {
        "title": "Barbaad",
        "artist": "Jubin Nautiyal",
    },
    "dhun": {
        "title": "Dhun",
        "artist": "Arijit Singh",
    },
    "pardesiya": {
        "title": "Pardesiya",
        "artist": "Sonu Nigam",
    },
    "humsafar": {
        "title": "Humsafar",
        "artist": "Sachet Tandon",
    },
    "tum_ho_toh": {
        "title": "Tum Ho Toh",
        "artist": "Vishal Mishra",
    },
    "kodak": {
        "title": "Kodak",
        "artist": "King, Seedhe Maut",
    },
    "madira": {
        "title": "Madira",
        "artist": "Seedhe Maut",
    },
    "namastute": {
        "title": "Namastute",
        "artist": "Seedhe Maut",
    }
}

# Known portfolio items metadata database to maintain custom descriptions
KNOWN_PORTFOLIO = {
    "7cc jersey": {
        "title": "7cc Esports Jersey",
        "category": "branding",
        "desc": "A premium sub-dyed esports jersey design featuring aggressive neon striping and clean branding placements."
    },
    "7ss croster": {
        "title": "7ss Roster Release",
        "category": "social",
        "desc": "A stylized team roster announcement graphic built with glowing player cards and future-tech borders."
    },
    "kj broky playtzz": {
        "title": "KJ Broky Highlights",
        "category": "gaming",
        "desc": "Esports thumbnail design with highly saturated brush strokes, custom text styles, and game art integration."
    },
    "some crazy gameplay": {
        "title": "Crazy Gameplay",
        "category": "gaming",
        "desc": "High-contrast action thumbnail layout engineered to capture attention and boost video click-through rates."
    },
    "birthday stream": {
        "title": "Birthday Stream Overlay",
        "category": "social",
        "desc": "Special event stream layout featuring celebratory glowing particle effects and custom social channel alerts."
    },
    "compressd": {
        "title": "Compressed Artwork",
        "category": "branding",
        "desc": "A minimal background study exploring dark gradients, digital grain textures, and neon highlights."
    },
    "gekko 1": {
        "title": "Gekko Neon Vector",
        "category": "branding",
        "desc": "Clean flat vector tracing of Gekko illustration from Valorant, layered with high-contrast glowing elements."
    },
    "gekko purple": {
        "title": "Gekko Purple Edition",
        "category": "branding",
        "desc": "An alternative color grading study of Gekko, utilizing vibrant purples and deep magenta overlays."
    },
    "gfx profile": {
        "title": "GFX Profile Artwork",
        "category": "branding",
        "desc": "Personal branding avatar design combining sci-fi HUD elements with a stylized initials monogram."
    },
    "good or bad": {
        "title": "Good or Bad Logo",
        "category": "branding",
        "desc": "Symmetric vector monogram design with custom curves, optimized for high-end clothing and print."
    },
    "insane ace": {
        "title": "Insane Ace Stream Layout",
        "category": "social",
        "desc": "Esports overlay pack featuring sleek streaming interfaces, modular chat panels, and system alerts."
    },
    "iso cant sleep": {
        "title": "Iso Cant Sleep",
        "category": "gaming",
        "desc": "Cinematic thumbnail art integrating Iso character model with custom typography and ambient lighting."
    },
    "jett w": {
        "title": "Jett Windlash",
        "category": "gaming",
        "desc": "High energy thumbnail graphic featuring Jett with color-matched atmospheric effects and 3D lettering."
    },
    "jett keep matching": {
        "title": "Jett Keep Matching",
        "category": "gaming",
        "desc": "Esports highlights cover art showing intense Jett visual grading and particle motion effects."
    },
    "lakshya 1": {
        "title": "Lakshya Gaming Header",
        "category": "social",
        "desc": "Custom banners tailored for esports creators, highlighting team branding and social credentials."
    },
    "purple thme": {
        "title": "Purple Tech Study",
        "category": "branding",
        "desc": "A stylized brand concept board focusing on purple neon lighting, space grids, and tech layouts."
    },
    "solo 5 kills erangle yt any": {
        "title": "Solo Erangel 5 Kills",
        "category": "gaming",
        "desc": "Erangel battle highlights thumbnail showcasing custom typography overlays and atmospheric grading."
    },
    "solo 7 kills miramar yt": {
        "title": "Solo Miramar 7 Kills",
        "category": "gaming",
        "desc": "Solo Miramar combat highlights thumbnail utilizing strong yellow lettering and character backlighting."
    },
    "speed thrills": {
        "title": "Speed Thrills Art",
        "category": "branding",
        "desc": "A fast-paced neon typographic graphic exploring speed lines, italics, and energetic cyan glows."
    },
    "sunday fun stream": {
        "title": "Sunday Fun Stream Banner",
        "category": "social",
        "desc": "YouTube gaming stream thumbnail featuring high-vibe character illustrations and bold overlays."
    },
    "tejo 2": {
        "title": "Tejo Character Concept",
        "category": "gaming",
        "desc": "Valorant style character grading study with high saturation details and neon stroke lines."
    },
    "the most underrated player": {
        "title": "Underrated Player Spotlight",
        "category": "gaming",
        "desc": "Highlight thumbnail utilizing central character scale, radial light rays, and high-impact custom font."
    },
    "thumbnail yellow brocky 2": {
        "title": "Yellow Brocky Thumbnail",
        "category": "gaming",
        "desc": "Esports action thumbnail integrating custom gaming models, textured texturing, and yellow neon halos."
    },
    "update 3.3": {
        "title": "Update Patch Notes",
        "category": "social",
        "desc": "Esports event patch update graphic designed to display notes in a clean, legible cyber list format."
    }
}

# Fallbacks
FALLBACK_COVERS = [
    "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400"
]

def load_portfolio_config():
    if os.path.exists(PORTFOLIO_CONFIG_FILE):
        try:
            with open(PORTFOLIO_CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print("-> Error parsing portfolio_config.json:", e)
    return None

def save_portfolio_config(config):
    with open(PORTFOLIO_CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2)

def find_local_cover(song_title):
    """Scans the images folder for an image matching the song title specifically."""
    if not os.path.exists(IMAGES_DIR):
        return None
        
    normalized_title = song_title.lower().replace("_", " ").replace("-", " ").strip()
    image_files = os.listdir(IMAGES_DIR)
    
    # 1. Direct keyword match (e.g. Dhun.png contains dhun)
    for filename in image_files:
        if not filename.lower().endswith((".png", ".jpg", ".jpeg")):
            continue
        normalized_filename = filename.lower().replace("_", " ").replace("-", " ")
        if normalized_title in normalized_filename:
            return f"images/{filename}"
            
    # 2. Word-by-word title keyword match
    words = [w for w in normalized_title.split() if len(w) > 2]
    for filename in image_files:
        if not filename.lower().endswith((".png", ".jpg", ".jpeg")):
            continue
        normalized_filename = filename.lower().replace("_", " ").replace("-", " ")
        if any(w in normalized_filename for w in words):
            return f"images/{filename}"
            
    # Fallback to default
    if "default.jpg" in image_files:
        return "images/default.jpg"
    elif "default.png" in image_files:
        return "images/default.png"
        
    return None

def sync_audios():
    if not os.path.exists(AUDIOS_DIR):
        os.makedirs(AUDIOS_DIR)
        return
        
    tracks = []
    files = sorted(os.listdir(AUDIOS_DIR))
    
    # Load config overrides
    music_config = load_music_config()
    if music_config is None:
        music_config = {}
    config_updated = False
    
    cover_idx = 0
    for filename in files:
        if not filename.lower().endswith(".mp3"):
            continue
            
        filepath = f"audios/{filename}"
        base_name = os.path.splitext(filename)[0].strip()
        lookup_key = base_name.lower()
        
        # Determine title, artist and default playlist category
        title = base_name
        artist = "Independent Artist"
        playlist = "bollywood" # default
        
        # Auto-categorize based on keywords
        hiphop_keywords = ["seedhe", "maut", "rap", "hiphop", "trap", "king", "krishna", "krsna", "nanchaku", "namastute", "kodak", "madira"]
        lofi_keywords = ["lofi", "chill", "sleep", "slowed", "reverb", "acoustic", "bethu", "tum ho", "humsafar", "likhne"]
        
        has_hiphop = any(kw in lookup_key for kw in hiphop_keywords)
        has_lofi = any(kw in lookup_key for kw in lofi_keywords)
        
        if has_hiphop:
            playlist = "hiphop"
        elif has_lofi:
            playlist = "lofi"

        matched = False
        for key, meta in KNOWN_AUDIO.items():
            if key in lookup_key:
                title = meta["title"]
                artist = meta["artist"]
                matched = True
                break
                
        if not matched:
            if " - " in base_name:
                parts = base_name.split(" - ", 1)
                artist = parts[0].strip().replace("_", " ").title()
                title = parts[1].strip().replace("_", " ").title()
            elif "-" in base_name:
                parts = base_name.split("-", 1)
                artist = parts[0].strip().replace("_", " ").title()
                title = parts[1].strip().replace("_", " ").title()
            else:
                title = base_name.replace("_", " ").strip().title()

        # Match Cover Art based on cleaned Title
        local_cover = find_local_cover(title)
        cover_art = local_cover if local_cover else FALLBACK_COVERS[cover_idx % len(FALLBACK_COVERS)]
        
        # Check config overrides
        if filename in music_config:
            overrides = music_config[filename]
            title = overrides.get("title", title)
            artist = overrides.get("artist", artist)
            playlist = overrides.get("playlist", playlist)
            final_cover = overrides.get("cover", cover_art)
            
            tracks.append({
                "title": title,
                "artist": artist,
                "src": filepath,
                "cover": final_cover,
                "playlist": playlist
            })
        else:
            # Register new song to music_config.json
            music_config[filename] = {
                "title": title,
                "artist": artist,
                "playlist": playlist,
                "cover": cover_art
            }
            config_updated = True
            
            tracks.append({
                "title": title,
                "artist": artist,
                "src": filepath,
                "cover": cover_art,
                "playlist": playlist
            })
        cover_idx += 1
            
    # Save config overrides back to disk
    save_music_config(music_config)

    # Write tracks.js
    os.makedirs("js", exist_ok=True)
    js_content = f"/* ==========================================\n   TRACKS LIST - AUTO-GENERATED\n   ========================================== */\n\nconst myTracks = {json.dumps(tracks, indent=2, ensure_ascii=False)};\n"
    with open(TRACKS_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"-> Audio Sync: Registered {len(tracks)} songs inside '{TRACKS_FILE}'")

def sync_portfolio():
    if not os.path.exists(PORTFOLIO_DIR):
        os.makedirs(PORTFOLIO_DIR)
        return
        
    projects = []
    files = sorted(os.listdir(PORTFOLIO_DIR))
    
    config = load_portfolio_config()
    if config is None:
        config = {}
    updated_config = {}
    
    for filename in files:
        if not filename.lower().endswith((".png", ".jpg", ".jpeg")):
            continue
            
        # Ignore copies/duplicates
        if "- copy" in filename.lower():
            continue
            
        filepath = f"portfolio/{filename}"
        base_name = os.path.splitext(filename)[0].strip()
        lookup_key = base_name.lower()
        
        # If in config, use saved config overrides!
        if filename in config:
            projects.append({
                "title": config[filename]["title"],
                "category": config[filename]["category"],
                "img": filepath,
                "desc": config[filename]["desc"]
            })
            updated_config[filename] = config[filename]
            continue
            
        # Run expanded auto-categorizer
        matched = False
        title = base_name
        category = "branding" # Default
        desc = ""
        
        for key, meta in KNOWN_PORTFOLIO.items():
            if key in lookup_key:
                title = meta["title"]
                category = meta["category"]
                desc = meta["desc"]
                matched = True
                break
                
        if not matched:
            social_kws = ['stream', 'banner', 'overlay', 'birthday', 'roster', 'croster', 'release', 'patch', 'update', 'thumbnail', 'youtube', 'yt', 'header', 'channel', 'social', 'media']
            gaming_kws = ['gameplay', 'kill', 'kills', 'ace', 'playtzz', 'highlights', 'jett', 'brocky', 'underrated', 'erangle', 'miramar', 'speed', 'thrills', 'iso', 'sleep', 'gaming', 'game', 'valorant', 'pubg', 'bgmi', 'csgo', 'cs2']
            uiux_kws = ['website', 'web', 'app', 'application', 'ui', 'ux', 'dashboard', 'uiux', 'concept', 'landing', 'interface', 'hud', 'figma', 'mockup']
            branding_kws = ['jersey', 'logo', 'branding', 'theme', 'gekko', 'gfx', 'profile', 'bad', 'compressd', 'vector', 'identity', 'typography', 'monogram', 'apparel']
            
            if any(kw in lookup_key for kw in uiux_kws):
                category = "ui"
            elif any(kw in lookup_key for kw in gaming_kws):
                category = "gaming"
            elif any(kw in lookup_key for kw in social_kws):
                category = "social"
            elif any(kw in lookup_key for kw in branding_kws):
                category = "branding"
                
            title = title.replace("_", " ").replace("-", " ").strip().title()
            
            if category == "ui":
                desc = "User interface mockup designed for responsive screen layouts, focus screens, and dynamic components."
            elif category == "gaming":
                desc = "Esports high-quality custom thumbnail graphic highlighting gaming content and stylized character design."
            elif category == "social":
                desc = "Stream layout banner overlay customized for social broadcast channels and social media announcements."
            else:
                desc = "Premium custom vector branding identity study for tech and esports organizations."
                
        projects.append({
            "title": title,
            "category": category,
            "img": filepath,
            "desc": desc
        })
        
        updated_config[filename] = {
            "title": title,
            "category": category,
            "desc": desc
        }
        
    # Carry over configurations for deleted items
    for filename, value in config.items():
        if filename not in updated_config:
            updated_config[filename] = value
            
    # Save config
    save_portfolio_config(updated_config)
    
    # Write projects.js
    os.makedirs("js", exist_ok=True)
    js_content = f"/* ==========================================\n   PORTFOLIO ITEMS - AUTO-GENERATED\n   ========================================== */\n\nconst myProjects = {json.dumps(projects, indent=2)};\n"
    with open(PROJECTS_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"-> Portfolio Sync: Registered {len(projects)} works inside '{PROJECTS_FILE}'")
    print(f"-> Metadata Configuration updated inside '{PORTFOLIO_CONFIG_FILE}'")

def main():
    print("==========================================")
    print("Running Sunil Portfolio Asset Sync...")
    print("==========================================")
    sync_audios()
    sync_portfolio()
    print("All tasks finished successfully!")

if __name__ == "__main__":
    main()
