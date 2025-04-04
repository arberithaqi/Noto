import { app, BrowserWindow } from 'electron';
import * as path from 'path';

export class WindowManager {
  private mainWindow: BrowserWindow | null = null;

  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }

  public createMainWindow(): BrowserWindow {
    // Erstelle das Browserfenster.
    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      titleBarStyle: 'hiddenInset', // macOS spezifisch
      trafficLightPosition: { x: 20, y: 20 }, // macOS spezifisch
      vibrancy: 'window', // macOS spezifisch (optional)
      visualEffectState: 'active', // macOS spezifisch (optional)
      webPreferences: {
        // nodeIntegration: false, // Standard und sicherer
        // contextIsolation: true, // Standard und sicherer
        // preload: path.join(__dirname, 'preload.js') // Pfad anpassen, falls Preload verwendet wird
      },
    });

    // Lade die index.html der App.
    // WICHTIG: Der Pfad muss relativ zum *Ausführungsort* von Electron sein (dist Verzeichnis)
    // __dirname in diesem Kontext zeigt auf dist/main/window
    const htmlPath = path.join(__dirname, '../../renderer/index.html');
    this.mainWindow.loadFile(htmlPath);

    // Setze mainWindow auf null, wenn das Fenster geschlossen wird
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // Öffne die DevTools (optional für Entwicklung).
    // this.mainWindow.webContents.openDevTools();

    return this.mainWindow;
  }

  public handleActivate(): void {
    // Stelle sicher, dass das Fenster neu erstellt oder angezeigt wird, wenn das Dock-Symbol geklickt wird (macOS)
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createMainWindow();
    } else if (this.mainWindow) {
      this.mainWindow.show();
      this.mainWindow.focus();
    }
  }

  public showWindow(): void {
      if (this.mainWindow) {
          this.mainWindow.show();
          this.mainWindow.focus();
      }
  }

  public hideWindow(): void {
      if (this.mainWindow) {
          this.mainWindow.hide();
      }
  }

  public toggleWindowVisibility(): void {
      if (!this.mainWindow) {
          this.createMainWindow(); // Erstelle Fenster, falls nicht vorhanden
          return;
      }
      if (this.mainWindow.isVisible() && this.mainWindow.isFocused()) {
          this.hideWindow();
      } else {
          this.showWindow();
      }
  }
} 