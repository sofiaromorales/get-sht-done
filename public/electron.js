const path = require('path')
const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const isDev = require('electron-is-dev')
const Store = require('electron-store');

let mainWindow = {
  show: () => {
    console.log("show");
  }
};

function createWindow() {
    //Create the Browser Window
    const window = new BrowserWindow({
        widt: 800,
        height: 800,
        backgroundColor: '#312450',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: __dirname + '/preload.js'
        }
    })
    // window.loadURL(
    //     isDev
    //     ? 'http://localhost:3000'
    //     :  `file://${path.join(__dirname, "../build/index.html")}`
    // )
    window.loadURL(`file://${path.join(__dirname, "../build/index.html")}`)
    if (isDev) {
        window.webContents.openDevTools({mode: 'detach'})
    }
    window.webContents.on('did-finish-load', () => {
        window.webContents.send('pending-tasks', store.get('pending-tasks'))
        window.webContents.send('complete-tasks', store.get('complete-tasks'))
        window.webContents.send('on-hold-tasks', store.get('on-hold-tasks'))
    })
    //window.webContents.send('pending-tasks', store.get('pending-tasks'))
    //window.loadFile('bu/index.html')
}

//Called once electron is ready

app.on('ready', () => createWindow())

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    mainWindow.show()
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

const store = new Store();

ipcMain.on('add_task', (event, arg) => {
    const {
        storeName,
        value
    } = arg
    store.set(storeName, value);
});

ipcMain.on('delete_tasks', (event, arg) => {
    const {
        storeName,
        value
    } = arg
    store.set(storeName, value);
});
