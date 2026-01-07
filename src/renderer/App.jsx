import React, { useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Playlist from "./components/Playlist";
import ThemeSwitch from "./components/ThemeSwitch";
import PlaylistModal from "./components/PlaylistModal";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [theme, setTheme] = useState("system");
  const [palette, setPalette] = useState("zorin");
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const currentTrack = tracks.length > 0 ? tracks[currentTrackIndex] : null;

  const applyTheme = (t) => {
    const resolved =
      t === "system"
        ? window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : t;

    document.documentElement.setAttribute("data-theme", resolved);
  };

  useEffect(() => {
    const saved = localStorage.getItem("mp-theme") || "system";
    setTheme(saved);
    applyTheme(saved);

    const savedPalette = localStorage.getItem("mp-palette") || "zorin";
    setPalette(savedPalette);
    document.documentElement.setAttribute("data-palette", savedPalette);

    const systemMedia =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const onSysChange = () => {
      if (localStorage.getItem("mp-theme") === "system") applyTheme("system");
    };

    if (systemMedia && systemMedia.addEventListener) {
      systemMedia.addEventListener("change", onSysChange);
      return () => systemMedia.removeEventListener("change", onSysChange);
    }
  }, []);

  // Listen for files opened from command line or file manager
  useEffect(() => {
    if (!window.electron) return;

    // Get initial files passed via command line
    window.electron.getCommandLineFiles?.().then((files) => {
      if (files && files.length > 0 && !files.error) {
        setTracks(files);
        setCurrentTrackIndex(0);
        setShouldAutoPlay(true);
      }
    });

    // Listen for files opened while app is running
    const handleOpenFiles = (event, files) => {
      if (files && files.length > 0) {
        const hadNoTracks = tracks.length === 0;
        setTracks((prev) => [...prev, ...files]);
        if (hadNoTracks) {
          setCurrentTrackIndex(0);
          setShouldAutoPlay(true);
        }
      }
    };

    window.electron.on?.("open-files", handleOpenFiles);

    return () => {
      window.electron.removeListener?.("open-files", handleOpenFiles);
    };
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("mp-theme", newTheme);
    applyTheme(newTheme);
  };

  const handlePaletteChange = (newPalette) => {
    setPalette(newPalette);
    localStorage.setItem("mp-palette", newPalette);
    document.documentElement.setAttribute("data-palette", newPalette);
  };

  const handleAddFiles = async () => {
    if (!window.electron?.selectAudioFiles) {
      alert("File selection not available");
      return;
    }

    const files = await window.electron.selectAudioFiles();
    if (files && files.length > 0 && !files.error) {
      const hadNoTracks = tracks.length === 0;
      setTracks((prev) => [...prev, ...files]);
      // اگر قبلاً آهنگی نبود، پخش خودکار فعال شه
      if (hadNoTracks) {
        setShouldAutoPlay(true);
      }
    }
  };

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleRemoveTrack = (index) => {
    setTracks((prev) => {
      const newTracks = prev.filter((_, i) => i !== index);

      if (newTracks.length === 0) {
        setCurrentTrackIndex(0);
      } else if (index === currentTrackIndex) {
        setCurrentTrackIndex(Math.min(currentTrackIndex, newTracks.length - 1));
      } else if (index < currentTrackIndex) {
        setCurrentTrackIndex(currentTrackIndex - 1);
      }

      return newTracks;
    });
  };

  const handleNext = () => {
    if (tracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setShouldAutoPlay(true);
  };

  const handlePrevious = () => {
    if (tracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  const handleClearPlaylist = () => {
    if (window.confirm("Clear entire playlist?")) {
      setTracks([]);
      setCurrentTrackIndex(0);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">AYMusic Player</h1>
        <div className="header-controls">
          <ThemeSwitch
            theme={theme}
            onThemeChange={handleThemeChange}
            palette={palette}
            onPaletteChange={handlePaletteChange}
          />
        </div>
      </header>

      <main className="main-content">
        <AudioPlayer
          currentTrack={currentTrack}
          onEnded={handleTrackEnded}
          onNext={handleNext}
          onPrevious={handlePrevious}
          shouldAutoPlay={shouldAutoPlay}
          onAutoPlayHandled={() => setShouldAutoPlay(false)}
        />

        {/* Desktop Playlist */}
        <div className="playlist-section desktop-only">
          <div className="playlist-header">
            <button className="add-files-btn" onClick={handleAddFiles}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add Files
            </button>
            {tracks.length > 0 && (
              <button className="clear-btn" onClick={handleClearPlaylist}>
                Clear All
              </button>
            )}
          </div>
          <Playlist
            tracks={tracks}
            currentTrackIndex={currentTrackIndex}
            onTrackSelect={handleTrackSelect}
            onRemoveTrack={handleRemoveTrack}
          />
        </div>

        {/* Mobile Playlist Button */}
        <div className="playlist-actions mobile-only">
          {tracks.length === 0 ? (
            <button className="add-files-btn" onClick={handleAddFiles}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add Files
            </button>
          ) : (
            <button
              className="playlist-toggle-btn"
              onClick={() => setIsPlaylistModalOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
              </svg>
              Playlist ({tracks.length})
            </button>
          )}
        </div>
      </main>

      {/* Playlist Modal for Mobile */}
      <PlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
      >
        <div className="modal-playlist-actions">
          <button className="add-files-btn" onClick={handleAddFiles}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add Files
          </button>
          {tracks.length > 0 && (
            <button
              className="clear-btn"
              onClick={() => {
                handleClearPlaylist();
                setIsPlaylistModalOpen(false);
              }}
            >
              Clear All
            </button>
          )}
        </div>
        <Playlist
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          onTrackSelect={(index) => {
            handleTrackSelect(index);
            setIsPlaylistModalOpen(false);
          }}
          onRemoveTrack={handleRemoveTrack}
        />
      </PlaylistModal>
    </div>
  );
}
