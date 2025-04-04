import { app } from 'electron';
import log from 'electron-log';
import { WindowManager } from './window/WindowManager';
import { AppUpdater } from './updater/AutoUpdater';
import { ShortcutManager } from './shortcuts/ShortcutManager';

// Globale Instanzen (oder über Dependency Injection verwalten)
let windowManager: WindowManager;
let appUpdater: AppUpdater;
let shortcutManager: ShortcutManager;

// Konfiguriere electron-log zentral
log.transports.file.level = 'info';
log.info('---------------------');
log.info('App starting...');
log.info(`Version: ${app.getVersion()}`)
log.info('---------------------');

// Hauptfunktion zum Starten der Anwendung
async function initializeApp() {
  // Stelle sicher, dass nur eine Instanz läuft (optional aber empfohlen)
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    log.warn('Another instance is already running. Quitting.');
    app.quit();
    return;
  }
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Jemand hat versucht, eine zweite Instanz zu starten.
    // Wir sollten unser Fenster fokussieren.
    log.warn('Second instance detected. Focusing main window.');
    if (windowManager) {
        const mainWindow = windowManager.getMainWindow();
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    }
  });

  // Initialisiere die Manager-Klassen
  windowManager = new WindowManager();
  appUpdater = new AppUpdater();
  shortcutManager = new ShortcutManager(windowManager);

  // App Lifecycle Events

  // Wird aufgerufen, wenn Electron initialisiert ist
  app.whenReady().then(() => {
    log.info('App is ready.');
    windowManager.createMainWindow();
    shortcutManager.registerGlobalShortcuts();
    appUpdater.checkForUpdates(); // Starte die Update-Prüfung

    // macOS spezifisch: Fenster neu erstellen/zeigen, wenn Dock-Icon geklickt wird
    app.on('activate', () => {
        log.info('App activated (macOS)');
        windowManager.handleActivate();
    });

  }).catch(err => {
      log.error('Error during app initialization:', err);
      // Kritischer Fehler, App kann evtl. nicht starten
      app.quit();
  });

  // Wird aufgerufen, bevor die App beendet wird
  app.on('will-quit', () => {
    log.info('App is quitting...');
    // Gib globale Shortcuts frei
    shortcutManager.unregisterAllShortcuts();
    log.info('App quit successfully.');
  });

  // Wird aufgerufen, wenn alle Fenster geschlossen sind
  app.on('window-all-closed', () => {
    log.info('All windows closed.');
    // Auf macOS ist es üblich, dass Apps aktiv bleiben, bis der Benutzer explizit beendet (Cmd+Q)
    // Auf anderen Plattformen beenden wir die App.
    if (process.platform !== 'darwin') {
      log.info('Quitting app because all windows are closed (non-macOS).');
      app.quit();
    }
  });
}

// Starte die Initialisierung
initializeApp().catch(error => {
    log.error('Failed to initialize app:', error);
    process.exit(1); // Beende den Prozess bei kritischem Initialisierungsfehler
});


