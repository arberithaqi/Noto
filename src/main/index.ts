import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Entwicklungsmodus-Check
const isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hält eine globale Referenz des Window-Objekts, um Garbage Collection zu verhindern
let mainWindow: BrowserWindow | null;

function createWindow() {
  // Erstellt das Browser-Fenster.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Wichtig für Sicherheit
      contextIsolation: true, // Wichtig für Sicherheit
    },
  });

  // Lädt die index.html der App.
  if (isDev) {
    // Vite Dev Server URL
    mainWindow.loadURL('http://localhost:5173'); // Standard Vite Port
    // Öffnet die DevTools im Entwicklungsmodus
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Wird ausgelöst, wenn das Fenster geschlossen wird.
  mainWindow.on('closed', () => {
    // Dereferenziert das Window-Objekt.
    mainWindow = null;
  });
}

// Diese Methode wird aufgerufen, wenn Electron mit der Initialisierung fertig ist
// und bereit ist, Browser-Fenster zu erstellen.
app.whenReady().then(createWindow);

// Wird ausgelöst, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
  // Unter macOS ist es üblich, dass Anwendungen und ihre Menüleiste
  // aktiv bleiben, bis der Benutzer explizit mit Cmd + Q beendet.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Unter macOS ist es üblich, ein Fenster der App neu zu erstellen,
  // wenn das Dock-Icon angeklickt wird und keine anderen Fenster offen sind.
  if (mainWindow === null) {
    createWindow();
  }
});

// Hier können Sie spezifischen Code für den Hauptprozess einfügen.
// Sie können auch separate Dateien erstellen und sie hier importieren.

// --- IPC Setup --- 
// Importiere IPC Handler (Beispiel)
// import './ipc/exampleHandler';

// --- Feature Module Setup --- 
// Importiere Feature Module (Beispiele)
// import './features/timer/timerMain';
// import './features/exporter/exporterMain';
// import './features/ocr/ocrMain';
// import './features/hotkey/hotkeyMain';
// import './features/chatgpt/chatgptMain';

// --- Core Module Setup ---
// Importiere Core Module (Beispiele)
// import './core/lifecycleManager';
// import './core/logger';
// import './core/errorHandler'; 