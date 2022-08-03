const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("files", {
  fileBrowser: () => ipcRenderer.send("fileBrowser"),
  sendFilePath: (filePath, cb) => ipcRenderer.on("sendFilePath", filePath, cb),
  qrCode: (code, cb) => ipcRenderer.on("qrCode", code, cb),
});
contextBridge.exposeInMainWorld("controller", {
  close: () => ipcRenderer.send("close"),
  minimize: () => ipcRenderer.send("minimize"),
});
