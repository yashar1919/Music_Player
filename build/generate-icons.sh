#!/bin/bash

# Icon Generator Script for AYMusic Player
# This script generates multiple icon sizes from the source icon

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ICONS_DIR="$SCRIPT_DIR/icons"
SOURCE_ICON="$ICONS_DIR/AYM.png"

echo "🎨 Generating icon sizes for AYMusic Player..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed!"
    echo "   Install it with: sudo apt install imagemagick"
    exit 1
fi

# Check if source icon exists
if [ ! -f "$SOURCE_ICON" ]; then
    echo "❌ Error: Source icon not found at $SOURCE_ICON"
    exit 1
fi

cd "$ICONS_DIR"

# Generate different sizes
echo "📐 Generating 16x16..."
convert AYM.png -resize 16x16 16x16.png

echo "📐 Generating 32x32..."
convert AYM.png -resize 32x32 32x32.png

echo "📐 Generating 48x48..."
convert AYM.png -resize 48x48 48x48.png

echo "📐 Generating 64x64..."
convert AYM.png -resize 64x64 64x64.png

echo "📐 Generating 128x128..."
convert AYM.png -resize 128x128 128x128.png

echo "📐 Generating 256x256..."
convert AYM.png -resize 256x256 256x256.png

echo "📐 Generating 512x512..."
cp AYM.png 512x512.png

echo "📐 Generating icon.png (for AppImage)..."
cp 512x512.png icon.png

echo "📐 Generating icon.ico (for Windows)..."
convert AYM.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico

echo "✅ All icon sizes generated successfully!"
echo ""
echo "Generated files:"
ls -lh *.png *.ico 2>/dev/null | grep -v AYM.png

echo ""
echo "✨ Done! You can now build the app with: npm run build"
