# Contributing to AYMusic Player

Thanks for your interest in contributing to AYMusic Player! 🎵

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Music_Player.git
   cd Music_Player
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Project Structure

```
Music_Player/
├── main/              # Electron main process
│   ├── index.js       # Main window & IPC handlers
│   └── preload.js     # Bridge between main and renderer
├── src/
│   └── renderer/      # React UI components
│       ├── App.jsx
│       ├── main.jsx
│       └── components/
├── build/             # Build resources (icons, .desktop file)
└── dist/              # Build output (ignored by git)
```

### Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them:

   ```bash
   npm run dev
   ```

3. Build to ensure everything works:

   ```bash
   npm run build
   ```

4. Commit your changes:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add volume control slider
fix: resolve audio playback issue on Ubuntu 24.04
docs: update installation instructions
```

## Code Style

- Use **2 spaces** for indentation
- Use **semicolons**
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

## Testing

Before submitting a PR, please test:

1. **Development mode**: `npm run dev`
2. **Build process**: `npm run build`
3. **Installation**: Test the generated .deb package
4. **File association**: Open audio files from file manager
5. **Different audio formats**: MP3, FLAC, WAV, etc.

## Reporting Issues

When reporting bugs, please include:

- Operating system and version
- Node.js and npm versions
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Error messages or logs

## Feature Requests

We welcome feature suggestions! Please:

1. Check existing issues first
2. Describe the feature clearly
3. Explain why it would be useful
4. Provide examples if possible

## Questions?

Feel free to open an issue for questions or discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
