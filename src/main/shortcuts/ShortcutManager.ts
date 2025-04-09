import { app, globalShortcut } from 'electron';
import { WindowManager } from '../window/WindowManager'; // Importiere WindowManager
import log from 'electron-log';

export class ShortcutManager {
  private windowManager: WindowManager;

  constructor(windowManager: WindowManager) {
    this.windowManager = windowManager;
  }

  public registerGlobalShortcuts(): void {
    // Registriere den globalen Shortcut zum Anzeigen/Verstecken des Fensters
    const ret = globalShortcut.register('Option+B', () => {
      log.info('Global shortcut Option+B triggered');
      this.windowManager.toggleWindowVisibility(); // Verwende Methode aus WindowManager
    });

    if (!ret) {
      log.error('Failed to register global shortcut Option+B');
    } else {
      log.info('Global shortcut Option+B registered successfully');
    }

    // Optional: Überprüfen, ob der Shortcut registriert wurde
    // log.info('Is shortcut Option+B registered:', globalShortcut.isRegistered('Option+B'));
  }

  public unregisterAllShortcuts(): void {
    globalShortcut.unregisterAll();
    log.info('All global shortcuts unregistered');
  }
} 