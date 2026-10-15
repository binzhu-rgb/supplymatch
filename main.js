const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Создаем окно приложения
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // Скрывает верхнее меню (File, Edit и т.д.)
    webPreferences: {
      nodeIntegration: true, // Разрешает использовать Node.js в HTML
      contextIsolation: false // Упрощает работу для локальных проектов
    }
  });

  // Загружаем ваш HTML-файл
  win.loadFile("index.html");
}

// Когда Electron готов, создаем окно
app.whenReady().then(() => {
  createWindow();

  // Для macOS: если приложение открыто, а окно закрыто — открываем новое
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Закрываем приложение, когда закрыты все окна (кроме macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});