# Partition Viewer - GitHub & Release Publishing Guide

This guide walks you through publishing your application to GitHub and creating releases with .deb packages for distribution.

## Table of Contents

1. [Initial GitHub Setup](#initial-github-setup)
2. [Authentication with GitHub](#authentication-with-github)
3. [Pushing Your Code](#pushing-your-code)
4. [Building Distribution Packages](#building-distribution-packages)
5. [Creating Releases](#creating-releases)
6. [Download Instructions for Users](#download-instructions-for-users)
7. [Automating Builds (Optional)](#automating-builds-optional)

---

## Initial GitHub Setup

### Prerequisites

- Git installed on your system
- GitHub account with repository created
- Repository URL: `https://github.com/yashar1919/partition_viewer.git`

### Step 1: Configure Git User

```bash
cd ~/Documents/VSCode\ Project/Myself\ Project/ElectronJS/first_electron_app

# Configure user name and email
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Initialize and Stage Files

```bash
# Initialize git (already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Partition Viewer - Linux disk partition visualization tool"
```

### Step 3: Prepare for Push

```bash
# Rename branch to 'main' (GitHub standard)
git branch -M main

# Add remote repository
git remote add origin https://github.com/yashar1919/partition_viewer.git

# Verify remote
git remote -v
```

---

## Authentication with GitHub

### Option A: SSH Key (Recommended - More Secure)

**1. Generate SSH Key**

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter to accept default location (~/.ssh/id_ed25519)
# Enter passphrase (or leave empty)
```

**2. Copy Public Key**

```bash
cat ~/.ssh/id_ed25519.pub
# Copy the entire output
```

**3. Add to GitHub**

1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Paste your public key
4. Click "Add SSH key"

**4. Update Remote to Use SSH**

```bash
git remote set-url origin git@github.com:yashar1919/partition_viewer.git
```

**5. Test Connection**

```bash
ssh -T git@github.com
# Should output: "Hi username! You've successfully authenticated..."
```

### Option B: Personal Access Token (PAT)

**1. Create Token**

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "partition-viewer"
4. Select scope: ✓ `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token immediately (you won't see it again!)

**2. Store Token Securely**

```bash
# Option 1: Git credential helper
git config --global credential.helper store
# Then paste token when prompted

# Option 2: Use SSH (recommended instead)
```

---

## Pushing Your Code

### Initial Push

```bash
# Push to GitHub
git push -u origin main

# If using HTTPS with PAT, paste token when prompted
# If using SSH, no password needed
```

### Verify Push

```bash
# Check status
git status
# Should show: "Your branch is up to date with 'origin/main'."

# View remote branches
git branch -r
```

### Future Commits

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Your descriptive message"
git push origin main
```

---

## Building Distribution Packages

### Prerequisites

```bash
# Ensure all dependencies are installed
npm install

# Verify Node.js and npm versions
node --version  # Should be 16+
npm --version   # Should be 8+
```

### Build Steps

**1. Build the React App**

```bash
npm run build:renderer
# Creates optimized build in dist/ folder
```

**2. Create .deb Package**

```bash
npm run dist
# Creates partition-viewer_1.0.0_amd64.deb
```

**3. Create AppImage Package**

```bash
npm run dist:appimage
# Creates partition-viewer-1.0.0.AppImage
```

**4. Verify Packages**

```bash
ls -lah dist/
# Should see:
# - partition-viewer_1.0.0_amd64.deb (≈ 150MB)
# - partition-viewer-1.0.0.AppImage (≈ 180MB)
```

### Testing Packages Locally

**Test .deb Installation**

```bash
sudo apt install ./dist/partition-viewer_1.0.0_amd64.deb
partition-viewer  # Should launch successfully
```

**Test AppImage**

```bash
chmod +x dist/partition-viewer-1.0.0.AppImage
./dist/partition-viewer-1.0.0.AppImage  # Should launch
```

---

## Creating Releases

### Using GitHub Web Interface (Easiest)

**1. Create Git Tag**

```bash
# Tag your release
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to GitHub
git push origin v1.0.0
```

**2. Go to GitHub Releases**

1. Visit: https://github.com/yashar1919/partition_viewer/releases
2. Click "Create a new release"
3. Select tag: `v1.0.0`
4. Title: "Partition Viewer v1.0.0"
5. Description:

```
## Features
- ✨ Real-time partition monitoring
- 🎨 Light/dark theme support
- 📊 Color-coded usage indicators
- 🖥️ System integration for all Linux filesystems

## Installation
Download .deb or AppImage below and follow README instructions.

## Changes
- Initial release
```

**4. Upload Files**

1. Drag and drop or click to upload:
   - `dist/partition-viewer_1.0.0_amd64.deb`
   - `dist/partition-viewer-1.0.0.AppImage`

**5. Publish**

Click "Publish release"

### Using Command Line (Advanced)

```bash
# Create release using GitHub CLI (if installed)
gh release create v1.0.0 \
  --title "Partition Viewer v1.0.0" \
  --notes "Initial release" \
  dist/partition-viewer_1.0.0_amd64.deb \
  dist/partition-viewer-1.0.0.AppImage
```

---

## Download Instructions for Users

Users can now download and install from your GitHub releases page.

### Instructions for Users

**Method 1: Install .deb Package (Recommended for Ubuntu/Debian)**

```bash
# Download from: https://github.com/yashar1919/partition_viewer/releases
# Then:
sudo apt install ./partition-viewer_1.0.0_amd64.deb
partition-viewer
```

**Method 2: Use AppImage (Any Linux Distribution)**

```bash
# Download from: https://github.com/yashar1919/partition_viewer/releases
# Then:
chmod +x partition-viewer-1.0.0.AppImage
./partition-viewer-1.0.0.AppImage
```

---

## Automating Builds (Optional)

Create GitHub Actions workflow to automatically build on tag push.

### Create Workflow File

Create `.github/workflows/build.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - "v*"

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Build renderer
        run: npm run build:renderer

      - name: Build packages
        run: |
          npm run dist
          npm run dist:appimage

      - name: Upload to Release
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### How It Works

1. You create a tag: `git tag -a v2.0.0 -m "Release v2.0.0"`
2. Push: `git push origin v2.0.0`
3. GitHub Actions automatically builds and uploads files!

---

## Updating Your Project

### For Small Changes

```bash
git add .
git commit -m "Fix: description of fix"
git push origin main
```

### For New Release

```bash
# Update version in package.json (e.g., 1.0.0 → 1.1.0)
nano package.json
# Change: "version": "1.1.0"

# Commit changes
git add package.json
git commit -m "Bump version to 1.1.0"

# Build new packages
npm run dist
npm run dist:appimage

# Create tag
git tag -a v1.1.0 -m "Release version 1.1.0"

# Push everything
git push origin main
git push origin v1.1.0

# Then create release on GitHub with new .deb and .AppImage files
```

---

## Troubleshooting

### Push Fails: "Permission denied"

**Problem:** Authentication failed

**Solution:**

```bash
# If using SSH:
ssh -T git@github.com  # Test connection

# If using HTTPS with PAT:
# Make sure you have active token and it has 'repo' scope
```

### Push Fails: "Unrelated histories"

**Problem:** GitHub repo has existing content

**Solution:**

```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Build Fails: "Icon not found"

**Problem:** Missing icon in `build/icons/`

**Solution:**

```bash
mkdir -p build/icons
# Add 256x256.png and 512x512.png
npm run dist
```

### .deb Installation Fails

**Problem:** Dependencies not installed

**Solution:**

```bash
sudo apt install ./partition-viewer_*.deb
sudo apt -f install  # Install missing dependencies
```

---

## Quick Reference

| Task           | Command                         |
| -------------- | ------------------------------- |
| Check status   | `git status`                    |
| View history   | `git log --oneline`             |
| Push to GitHub | `git push origin main`          |
| Create tag     | `git tag -a v1.0.0 -m "msg"`    |
| Push tag       | `git push origin v1.0.0`        |
| Build .deb     | `npm run dist`                  |
| Build AppImage | `npm run dist:appimage`         |
| Test .deb      | `sudo apt install ./dist/*.deb` |
| Update version | Edit `package.json`             |

---

## Support

- 📖 [GitHub Documentation](https://docs.github.com)
- 📝 [Git Documentation](https://git-scm.com/doc)
- 🐛 [Report Issues](https://github.com/yashar1919/partition_viewer/issues)

---

**Happy releasing! 🚀**
