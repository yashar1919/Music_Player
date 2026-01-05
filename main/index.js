const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

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

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        minWidth: 400,
        minHeight: 400,
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
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});