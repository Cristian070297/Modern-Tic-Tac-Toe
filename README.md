# Background Music Setup

## How to Add Your MP3 File

1. **Copy your MP3 file** to the same folder as the game files
2. **Rename it to:** `background-music.mp3`
3. **Make sure it's in the same directory as:**
   - index.html
   - style.css
   - script.js
   - audio.js

## File Structure Should Look Like:
```
Project A/
├── index.html
├── style.css
├── script.js
├── audio.js
├── background-music.mp3  ← Your MP3 file goes here
└── README.md
```

## Music Controls

- **🎵 Music Button**: Click to toggle background music on/off
- **Green Button**: Music is playing
- **Red Button**: Music is muted
- **Volume**: Set to 30% by default (comfortable level)

## Notes

- The music will loop automatically
- Due to browser autoplay restrictions, you may need to click the music button to start playback
- Supported formats: MP3, WAV, OGG
- For best performance, use MP3 files under 10MB

## Troubleshooting

If music doesn't play:
1. Make sure the file is named exactly `background-music.mp3`
2. Check that the file is in the same folder as index.html
3. Try clicking the music button after the page loads
4. Check browser console for any error messages
