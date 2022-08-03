const {
  app,
  BrowserWindow,
  dialog,
  getCurrentWindow,
  ipcMain,
} = require("electron");
const { runServer } = require("./express/server.js");
const QRCode = require("qrcode");
const path = require("path");
const isDev = require("electron-is-dev");
const { basename } = require("path");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    frame: false,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.setResizable(false);
  win.removeMenu();

  ipcMain.on("minimize", () => win.minimize());
  ipcMain.on("close", () => win.close());

  ipcMain.on("fileBrowser", async () => {
    await dialog
      .showOpenDialog(getCurrentWindow, {
        properties: ["openFile"],
        buttonLabel: "Open File",
      })
      .then((filepath) => {
        const pathFile = filepath.filePaths[0];
        win.webContents.send("sendFilePath", basename(pathFile));
        const server = runServer(pathFile);
        const clientIp = Object.values(require("os").networkInterfaces())
          .flat()
          .filter((item) => !item.internal && item.family === "IPv4")
          .find(Boolean).address;
        const qrString = `http://${clientIp}:80/${basename(pathFile)}`;
        const filename = basename(pathFile);
        const qrCode = qrGen(encodeURI(qrString), (code) => {
          win.webContents.send("qrCode", {
            code: code,
            url: qrString,
            filename: filename,
          });
        });
      });
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

const qrGen = (link, cb) => {
  QRCode.toDataURL(link, (err, url) => {
    if (err) return console.log(err);
    return cb(url);
  });
};
