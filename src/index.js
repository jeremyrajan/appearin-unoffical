const electron = require('electron');
  // Module to control application life.
const app = electron.app;
  // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const getLogoPath = () => {
  let OS;
  if (process.platform === 'darwin') {
    OS = 'MAC';
  } else if (process.platform === 'win32') {
    OS = 'WIN';
  }

  if (OS === 'MAC') {
    return `${__dirname}/images/icon.png`;
  }

  return `${__dirname}/images/icon.ico`;
};

const createWindow = () => {
  const logoPath = getLogoPath();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 594,
    frame: false,
    maximizable: true,
    fullscreenable: true,
    fullscreen: false,
    icon: logoPath
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/template/index.html`);


  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Open the DevTools if running dev
  if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath)) {
    mainWindow.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
