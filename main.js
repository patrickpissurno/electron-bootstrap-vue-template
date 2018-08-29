const { app, BrowserWindow, ipcMain, dialog, nativeImage } = require('electron');
const path = require('path');
const url = require('url');
const express = require('express');

const PORT = 4800;
const BASE_ADDR = `http://127.0.0.1:${PORT}`;

let mainWindow = null;

(async () => {

    if(process.argv[2] != 'dev'){
        let expApp = express();
        expApp.use(express.static('dist'));
        expApp.listen(PORT, '127.0.0.1', electron);
    }
    else
        electron();

    async function electron()
    {
        function createWindow() {
            mainWindow = new BrowserWindow({
                width: 1000,
                height: 600,
                minWidth: 1000,
                minHeight: 600,
                show: false,
                webPreferences: { webSecurity: false }
            });

            mainWindow.loadURL(BASE_ADDR);

            mainWindow.once('ready-to-show', () => {
                mainWindow.show();
            });
        }

        app.on('ready', createWindow);

        // Quit when all windows are closed.
        app.on('window-all-closed', function () {
            mainWindow = null;
            if (process.platform !== 'darwin')
                app.quit();
        });

        app.on('activate', function () {
            if (mainWindow == null)
                createWindow();
        });

        ipcMain.on('asynchronous-message', (event, arg) => {
            const reply = obj => event.sender.send('asynchronous-reply', JSON.stringify(obj));

            let ev = JSON.parse(arg);
            switch(ev.type){
                case "ping":
                    reply({ type: 'ping', data: 'pong' });
                    break;
            }
        });
    }
})();

module.exports = {
    
}