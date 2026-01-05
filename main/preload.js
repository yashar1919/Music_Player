const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    versions: process.versions,
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    // convenience method to select audio files
    selectAudioFiles: () => ipcRenderer.invoke('select-audio-files')
});