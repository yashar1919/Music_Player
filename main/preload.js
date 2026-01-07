const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    versions: process.versions,
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => {
        // Whitelist channels that can be listened to
        const validChannels = ['open-files'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, listener);
        }
    },
    // Remove listener
    removeListener: (channel, listener) => {
        ipcRenderer.removeListener(channel, listener);
    },
    // convenience method to select audio files
    selectAudioFiles: () => ipcRenderer.invoke('select-audio-files'),
    // get files passed via command line
    getCommandLineFiles: () => ipcRenderer.invoke('get-command-line-files')
});