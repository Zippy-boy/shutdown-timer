const { app, BrowserWindow, Menu, ipcMain, powerSaveBlocker, powerMonitor,  } = require('electron');
const url = require('url');
const path = require('path');
const electronDrag = require('electron-drag');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  // const image_path = path.join( __dirname, 'icon.png');
  // const fs = require("fs")

  // if (!fs.existsSync(image_path)) {
  //   throw new Error("File do not exitst \n"+image_path)
  // }

  // var image = nativeImage.createFromPath(image_path);

  const mainWindow = new BrowserWindow({
    width: 460,
    height: 475,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: false,
      nodeIntegration: true,
      contextIsolation: false
    },
    // icon: image,
    resizable: true, // SHOULD BE FALSE
    titleBarStyle: 'hidden',
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.webContents.openDevTools();
  electronDrag(mainWindow);

  ipcMain.on('minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.on('focusWindow', () => {
    console.log("focusWindow")
    // Focus the window
    win.focus();
    // Set the window as always on top
    win.setAlwaysOnTop(true);
    // Restore the window (if minimized)
    if (win.isMinimized()) {
        win.restore();
    }
  })
};


const menu = Menu.buildFromTemplate([
  // {
  //   role: 'fileMenu'
  // },
  // {
  //   role: 'help',
  //   submenu: [
  //     {
  //       label: 'Learn More',
  //       click: createHelpWindow
  //     },
  //   ],
  // },
  // {
  //   label: 'Developer',
  //   submenu: [
  //     {
  //       role: 'reload'
  //     },
  //     {
  //       role: 'toggledevtools'
  //     },
  //   ],
  // },
]);
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  powerMonitor.on("lock-screen", () => {
    powerSaveBlocker.start("prevent-display-sleep");
  });
  powerMonitor.on("suspend", () => {
    powerSaveBlocker.start("prevent-app-suspension");
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

