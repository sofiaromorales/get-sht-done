const path = require('path')
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

function createWindow() {
    //Create the Browser Window
    const window = new BrowserWindow({
        widt: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    window.loadURL('http://localhost:3000')
    if (isDev) {
        window.webContents.openDevTools({mode: 'detach'})
    }
    //window.loadFile('bu/index.html')
}

//Called once electron is ready

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
