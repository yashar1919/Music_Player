# AYMusic Player

A minimalist music player for Linux built with ElectronJS and React.

## Features

- 🎵 Play audio files (MP3, WAV, OGG, FLAC, M4A, AAC, WMA)
- ⏯️ Basic playback controls (Play, Pause, Stop, Previous, Next)
- 📝 Playlist management
- 🎨 Clean and minimal design
- 🌓 Light/Dark theme support
- 📦 Available as .deb package and AppImage

## Screenshots

Clean, minimal interface with essential playback controls and playlist management.

## Installation

### Ubuntu/Debian (.deb)

```bash
sudo dpkg -i aymusic-player_1.0.0_amd64.deb
```

### AppImage (Universal)

```bash
chmod +x AYMusic\ Player-1.0.0.AppImage
./AYMusic\ Player-1.0.0.AppImage
```

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Create .deb package
npm run dist

# Create AppImage
npm run dist:appimage
```

## Project Structure

```
music_player_for_linux/
├── main/                    # Electron main process
│   ├── index.js            # Main entry point
│   └── preload.js          # Preload script
├── src/
│   └── renderer/           # React frontend
│       ├── App.jsx         # Main app component
│       ├── index.css       # Styles
│       ├── main.jsx        # React entry point
│       └── components/     # React components
│           ├── AudioPlayer.jsx
│           └── Playlist.jsx
├── build/                  # Build resources
├── dist/                   # Built packages
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
└── vite.config.js        # Vite configuration
```

## Usage

1. Click "Add Files" to select audio files
2. Use playback controls to play/pause/stop music
3. Navigate between tracks using Previous/Next buttons
4. Remove tracks from playlist by clicking the X button
5. Change theme using the dropdown in the header

## Technologies

- **ElectronJS** - Desktop application framework
- **React** - UI framework
- **Vite** - Build tool
- **electron-builder** - Package builder

## License

ISC

## Author

Yashar <yashar@example.com>
