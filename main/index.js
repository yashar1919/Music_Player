const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Store files passed via command line
let filesToOpen = [];

// IPC handler: open file dialog to select audio files
ipcMain.handle('select-audio-files', async () => {
    try {
        const result = await dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac', 'wma'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        });

        if (result.canceled) {
            return [];
        }

        // Return file paths with metadata
        return result.filePaths.map(filePath => ({
            path: filePath,
            name: path.basename(filePath),
            title: path.basename(filePath, path.extname(filePath))
        }));
    } catch (err) {
        console.error('select-audio-files error', err);
        return { error: String(err) };
    }
});

// IPC handler: get files that were passed to app via command line
ipcMain.handle('get-command-line-files', async () => {
    try {
        return filesToOpen.map(filePath => ({
            path: filePath,
            name: path.basename(filePath),
            title: path.basename(filePath, path.extname(filePath))
        }));
    } catch (err) {
        console.error('get-command-line-files error', err);
        return { error: String(err) };
    }
});

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 530,
        minWidth: 400,
        minHeight: 530,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            // Disable sandbox for Linux compatibility
            sandbox: false
        }
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Send command line files to renderer after window loads
    win.webContents.on('did-finish-load', () => {
        if (filesToOpen.length > 0) {
            win.webContents.send('open-files', filesToOpen.map(filePath => ({
                path: filePath,
                name: path.basename(filePath),
                title: path.basename(filePath, path.extname(filePath))
            })));
        }
    });
}

// Handle file open on macOS
app.on('open-file', (event, filePath) => {
    event.preventDefault();

    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
        // App is already running, send files to renderer
        win.webContents.send('open-files', [{
            path: filePath,
            name: path.basename(filePath),
            title: path.basename(filePath, path.extname(filePath))
        }]);
    } else {
        // App is not running yet, store files
        filesToOpen.push(filePath);
    }
});

// Parse command line arguments on Linux/Windows
function parseCommandLineArgs() {
    // argv[0] is electron, argv[1] is main script
    // Additional arguments are file paths
    const args = process.argv.slice(process.defaultApp ? 2 : 1);

    // Filter out electron flags and get actual file paths
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac', '.wma'];
    filesToOpen = args.filter(arg => {
        if (arg.startsWith('-')) return false; // Skip flags
        const ext = path.extname(arg).toLowerCase();
        return audioExtensions.includes(ext);
    });
}

// Parse args before app is ready
parseCommandLineArgs();

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Handle second-instance for single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, focus our window and open files
        const win = BrowserWindow.getAllWindows()[0];
        if (win) {
            if (win.isMinimized()) win.restore();
            win.focus();

            // Parse files from second instance
            const audioExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac', '.wma'];
            const args = commandLine.slice(process.defaultApp ? 2 : 1);
            const files = args.filter(arg => {
                if (arg.startsWith('-')) return false;
                const ext = path.extname(arg).toLowerCase();
                return audioExtensions.includes(ext);
            });

            if (files.length > 0) {
                win.webContents.send('open-files', files.map(filePath => ({
                    path: filePath,
                    name: path.basename(filePath),
                    title: path.basename(filePath, path.extname(filePath))
                })));
            }
        }
    });
}