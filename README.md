# AYMusic Player

A sleek, modern Linux music player with automatic playlist continuation, album artwork support, and beautiful theme customization.

## Features

✨ **Smart Playback**

- Auto-play on file addition
- Seamless track progression (no manual play between tracks)
- Support for MP3, WAV, OGG, FLAC, M4A, AAC, WMA formats
- Real-time audio visualization

🎨 **Beautiful UI**

- 5 stunning color palettes (Zorin, Ubuntu, Mint, Manjaro, Elementary)
- Light, dark, and system theme support
- Smooth animations and modern gradient effects
- Responsive design for all screen sizes

📀 **Album Artwork**

- Automatic metadata extraction (title, artist, album)
- Embedded cover art display (200x200px)
- Beautiful placeholder for tracks without artwork
- Artwork thumbnails in playlist (48x48px)

🎵 **Playlist Management**

- Drag-and-drop file selection
- Visual track indicators
- One-click track removal
- Modal playlist view for mobile
- Persistent playlist during session

🖥️ **Desktop Integration**

- Native window controls
- System tray support
- File association for audio formats
- Clean, distraction-free interface

## Quick Start

### Installation from .deb Package (Recommended)

Download the latest `.deb` file from [Releases](https://github.com/yashar1919/Music_Player/releases) and install:

```bash
sudo apt install ./aymusic-player_1.0.0_amd64.deb
aymusic-player
```

### Installation from AppImage

```bash
chmod +x AYMusic\ Player-*.AppImage
./AYMusic\ Player-*.AppImage
```

## Complete Setup Guide

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 8+
- Linux system (Ubuntu 20.04+ recommended)
- Git

### Installation Options

#### Option 1: Download .deb Package

1. Go to [Releases](https://github.com/yashar1919/Music_Player/releases)
2. Download the latest `.deb` file (e.g., `aymusic-player_1.0.0_amd64.deb`)
3. Install:
   ```bash
   sudo apt install ./aymusic-player_*.deb
   ```
4. Launch from your applications menu or run:
   ```bash
   aymusic-player
   ```

#### Option 2: Download AppImage

1. Go to [Releases](https://github.com/yashar1919/Music_Player/releases)
2. Download the latest `.AppImage` file
3. Make it executable and run:
   ```bash
   chmod +x AYMusic\ Player-*.AppImage
   ./AYMusic\ Player-*.AppImage
   ```

#### Option 3: Build from Source

```bash
# Clone repository
git clone https://github.com/yashar1919/Music_Player.git
cd Music_Player

# Install dependencies
npm install

# Development mode (live reload)
npm run dev

# Build for production
npm run build

# Create .deb package
npm run dist

# Create AppImage package
npm run dist:appimage
```

Built packages will be in the `dist/` directory.

## Usage

### Launch the Application

After installation, launch from:

- Applications menu (search for "AYMusic Player")
- Or run: `aymusic-player`

### Adding Music

1. Click "Add Files" button
2. Select one or multiple audio files
3. Music starts playing automatically!

### Theme Customization

Click the theme controls in the top-right corner:

- **☀️ Light theme**
- **🌙 Dark theme**
- **⚙️ System theme** (follows OS preference)

### Color Palette Selection

Click the palette icon to choose from:

- 🔵 **Zorin** - Sky blue gradients
- 🟠 **Ubuntu** - Warm orange to pink
- 🟢 **Mint** - Fresh lime to emerald
- 🟩 **Manjaro** - Emerald to teal
- 💙 **Elementary** - Blue to purple

### Playback Controls

- **▶️ Play/Pause** - Toggle playback
- **⏹️ Stop** - Stop and reset track
- **⏮️ Previous** - Go to previous track
- **⏭️ Next** - Skip to next track
- **🔊 Volume** - Adjust volume slider
- **🔇 Mute** - Toggle mute

### Playlist Management

- **Click track** - Jump to that track
- **❌ Remove** - Delete track from playlist
- **Clear All** - Remove all tracks at once

## Development

### Project Structure

```
music_player_for_linux/
├── main/
│   ├── index.js              # Electron main process & IPC handlers
│   └── preload.js            # Secure context bridge
├── src/renderer/
│   ├── App.jsx               # Main React component
│   ├── index.css             # Global styles & themes
│   ├── main.jsx              # React entry point
│   └── components/
│       ├── AudioPlayer.jsx       # Main player with controls
│       ├── AudioVisualizer.jsx   # Visual audio representation
│       ├── Playlist.jsx          # Track list display
│       ├── PlaylistModal.jsx     # Mobile playlist view
│       └── ThemeSwitch.jsx       # Theme & palette controls
├── build/                    # Build resources & icons
├── scripts/                  # Build and deployment scripts
├── package.json
├── vite.config.js           # Vite configuration
└── README.md
```

### Development Commands

```bash
# Development server (Vite + Electron)
npm run dev

# Run renderer only (for UI development)
npm run dev:renderer

# Run Electron only
npm run dev:electron

# Build React app only
npm run build:renderer

# Full production build
npm run build

# Create Linux packages
npm run dist              # .deb package
npm run dist:appimage     # AppImage package
npm run pack              # Portable package
```

### Technology Stack

- **Electron 39.2.7** - Desktop framework
- **React 19.2.3** - UI library
- **Vite 7.3.0** - Build tool & dev server
- **Electron-builder 26.0.12** - Packaging
- **music-metadata 11.10.4** - Audio metadata extraction

### IPC Architecture

Secure communication between processes:

```javascript
// Renderer (React)
const files = await window.electron.selectAudioFiles();

// Main (Electron)
ipcMain.handle("select-audio-files", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [
      {
        name: "Audio Files",
        extensions: ["mp3", "wav", "ogg", "flac", "m4a", "aac", "wma"],
      },
    ],
  });

  // Extract metadata and artwork
  return await Promise.all(
    result.filePaths.map(async (filePath) => {
      const metadata = await parseFile(filePath);
      return {
        path: filePath,
        title: metadata.common.title,
        artist: metadata.common.artist,
        artwork: extractArtwork(metadata),
      };
    })
  );
});
```

## Configuration

### Customize Themes

Edit CSS variables in `src/renderer/index.css`:

```css
:root {
  --bg: #050a14; /* Dark background */
  --text: #e6eef8; /* Light text */
  --accent: #15b5f1; /* Accent color */
  --card-bg: #0a1628; /* Card background */
}

[data-theme="light"] {
  --bg: #fbfdff;
  --text: #07122a;
  --accent: #2563eb;
  --card-bg: #ffffff;
}
```

### Add New Color Palettes

Add new palette in `src/renderer/index.css`:

```css
[data-palette="custom"] {
  --accent: #ff6b6b;
  --accent-hover: #ee5a5a;
  --btn-bg: linear-gradient(135deg, #ff6b6b, #ee5a5a, #ff8787);
}
```

Then add to `ThemeSwitch.jsx`:

```javascript
const palettes = [
  { name: "Zorin", value: "zorin", color: "#15B5F1" },
  { name: "Custom", value: "custom", color: "#FF6B6B" },
];
```

### Audio Format Support

Supported via HTML5 Audio API:

- **MP3** - MPEG Audio Layer 3
- **WAV** - Waveform Audio
- **OGG** - Ogg Vorbis
- **FLAC** - Free Lossless Audio Codec
- **M4A** - MPEG-4 Audio
- **AAC** - Advanced Audio Coding
- **WMA** - Windows Media Audio

## Building for Release

### Create Release on GitHub

```bash
# Build distribution packages
npm run dist
npm run dist:appimage

# Upload files to GitHub Releases:
# 1. Go to https://github.com/yashar1919/Music_Player/releases
# 2. Create new release
# 3. Upload dist/*.deb and dist/*.AppImage files
```

### Automated GitHub Actions (Optional)

Create `.github/workflows/build.yml`:

```yaml
name: Build & Release

on:
  push:
    tags:
      - "v*"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run dist
      - run: npm run dist:appimage
      - uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/*.deb
            dist/*.AppImage
```

## Album Artwork Support

### Supported Formats

AYMusic Player automatically extracts embedded artwork from:

- **ID3v2** tags (MP3)
- **Vorbis Comments** (OGG, FLAC)
- **iTunes metadata** (M4A, AAC)
- **WMA tags** (WMA)

### Adding Artwork to Files

If your audio files don't have embedded artwork, use these tools:

#### Mp3tag (Recommended)

```bash
sudo apt install mp3tag
# or via Flatpak
flatpak install flathub org.mp3tag.Mp3tag
```

#### Kid3

```bash
sudo apt install kid3
```

#### EasyTAG

```bash
sudo apt install easytag
```

#### FFmpeg (Command Line)

```bash
ffmpeg -i input.mp3 -i cover.jpg -map 0:0 -map 1:0 -c copy -id3v2_version 3 \
  -metadata:s:v title="Album cover" -metadata:s:v comment="Cover (front)" output.mp3
```

### Artwork Recommendations

- ✅ Format: JPG or PNG
- ✅ Size: 500x500 to 1000x1000 pixels
- ✅ File size: < 500 KB
- ✅ Embedded in audio file metadata

## Troubleshooting

### No audio playback

- Verify audio files are in supported formats
- Check system audio settings
- Try running: `npm run dev` to see console errors

### White screen on startup

- Clear cache: `rm -rf ~/.cache/aymusic-player`
- Rebuild: `npm run build`
- Check for JavaScript errors in DevTools (Ctrl+Shift+I)

### Build fails with icon error

- Ensure PNG icons exist in `build/icons/`
- Required: 256x256.png, 512x512.png
- Or provide your own and update `package.json`

### .deb installation fails

- Install missing dependencies: `sudo apt -f install`
- Check system requirements (Ubuntu 20.04+)
- Verify package integrity

### AppImage won't run

- Make it executable: `chmod +x AYMusic\ Player-*.AppImage`
- Run from terminal to see error messages
- Check for missing libraries

### Metadata not showing

- Verify files have embedded metadata
- Use Mp3tag or similar tools to add metadata
- Check file permissions (must be readable)

### Theme not persisting

- Check localStorage is enabled
- Clear browser/app cache
- Verify `localStorage.setItem()` permissions

## Performance Tips

- 🚀 Keep playlist under 1000 tracks for optimal performance
- 🖼️ Use compressed artwork (< 500 KB) to reduce memory usage
- 💾 Store music files on SSD for faster loading
- 🔄 Close other audio applications to avoid conflicts

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style (Prettier + ESLint)
- Add comments for complex logic
- Test on multiple Linux distributions
- Update documentation as needed
- Keep commits atomic and well-described

## Roadmap

- [ ] Shuffle and repeat modes
- [ ] Equalizer with presets
- [ ] Keyboard shortcuts
- [ ] Save/load playlist files (.m3u, .pls)
- [ ] Lyrics display
- [ ] Mini player mode
- [ ] Internet radio support
- [ ] Music library organization

## License

ISC License © 2025 Yashar - Free for personal and commercial use

## Support

- 🐛 [Report bugs](https://github.com/yashar1919/Music_Player/issues)
- 💡 [Request features](https://github.com/yashar1919/Music_Player/discussions)
- 📖 [View documentation](https://github.com/yashar1919/Music_Player/wiki)
- ⭐ [Star on GitHub](https://github.com/yashar1919/Music_Player)

## Acknowledgments

- Built with [Electron](https://electronjs.org)
- UI powered by [React](https://react.dev)
- Metadata extraction via [music-metadata](https://github.com/Borewit/music-metadata)
- Icons from [Heroicons](https://heroicons.com)

---

**Made with ❤️ for Linux**
