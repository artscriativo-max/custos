const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "Agri Doce - Controle de Produção & Custos",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false
        }
    });

    // Oculta a barra de menu padrão para deixar o visual limpo e profissional (Padrão SPA)
    win.setMenuBarVisibility(false);

    // Carrega o arquivo index.html de dentro da pasta www
    win.loadFile(path.join(__dirname, 'www', 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
