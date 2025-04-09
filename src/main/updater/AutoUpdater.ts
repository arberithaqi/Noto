import { dialog } from 'electron';
import * as electronUpdater from 'electron-updater';
import log from 'electron-log';

// Verwende die importierten Komponenten
const { autoUpdater } = electronUpdater;
type UpdateInfo = electronUpdater.UpdateInfo;
type ProgressInfo = electronUpdater.ProgressInfo;

export class AppUpdater {
  constructor() {
    // Konfiguriere electron-log, falls noch nicht geschehen (kann auch zentral erfolgen)
    if (!log.transports.file.level) {
        log.transports.file.level = 'info';
    }

    // Konfiguriere den autoUpdater
    autoUpdater.logger = log; // Nutze electron-log für das Logging
    autoUpdater.autoDownload = false; // Deaktiviere automatischen Download

    this.registerEventHandlers();
  }

  private registerEventHandlers(): void {
    autoUpdater.on('checking-for-update', this.handleCheckingForUpdate);
    autoUpdater.on('update-available', this.handleUpdateAvailable);
    autoUpdater.on('update-not-available', this.handleUpdateNotAvailable);
    autoUpdater.on('error', this.handleError);
    autoUpdater.on('download-progress', this.handleDownloadProgress);
    autoUpdater.on('update-downloaded', this.handleUpdateDownloaded);
  }

  // --- Event Handler Methoden ---

  private handleCheckingForUpdate(): void {
    log.info('Checking for update...');
  }

  private handleUpdateAvailable(info: UpdateInfo): void {
    log.info('Update available.', info);
    dialog.showMessageBox({
      type: 'info',
      title: 'Update verfügbar',
      message: `Eine neue Version (${info.version}) von Noto ist verfügbar. Möchten Sie das Update jetzt herunterladen?`,
      buttons: ['Ja', 'Nein']
    }).then(({ response }: { response: number }) => {
      if (response === 0) {
        log.info('User agreed to download update.');
        autoUpdater.downloadUpdate();
      } else {
        log.info('User declined update download.');
      }
    }).catch(error => {
      log.error('Update error:', error);
    });
  }

  private handleUpdateNotAvailable(info: UpdateInfo): void {
    log.info('Update not available.', info);
    // Optional: Benachrichtigung oder Logging
  }

  private handleError(err: Error): void {
    log.error('Error in auto-updater.', err);
    dialog.showErrorBox('Update Fehler', `Beim Prüfen/Herunterladen von Updates ist ein Fehler aufgetreten: ${err.message}`);
  }

  private handleDownloadProgress(progressObj: ProgressInfo): void {
    const log_message = `Download speed: ${Math.round(progressObj.bytesPerSecond / 1024)} KB/s - Downloaded ${Math.round(progressObj.percent)}% (${Math.round(progressObj.transferred / 1024 / 1024)}MB/${Math.round(progressObj.total / 1024 / 1024)}MB)`;
    log.info(log_message);
    // Optional: Fortschritt an das Renderer-Fenster senden
    // mainWindow?.webContents.send('update_progress', progressObj.percent);
  }

  private handleUpdateDownloaded(info: UpdateInfo): void {
    log.info('Update downloaded.', info);
    dialog.showMessageBox({
      type: 'info',
      title: 'Update bereit zur Installation',
      message: `Das Update (${info.version}) wurde heruntergeladen. Starten Sie die Anwendung neu, um das Update zu installieren.`,
      buttons: ['Jetzt neu starten', 'Später']
    }).then(({ response }: { response: number }) => {
      if (response === 0) {
        log.info('User agreed to quit and install.');
        autoUpdater.quitAndInstall();
      } else {
        log.info('User chose to install later.');
      }
    }).catch(error => {
      log.error('Update install error:', error);
    });
  }

  // --- Öffentliche Methoden ---

  public checkForUpdates(): void {
    log.info('Explicitly checking for updates...');
    // `checkForUpdatesAndNotify` prüft und zeigt ggf. *automatisch* einen Standard-Dialog an.
    // Wenn wir eigene Dialoge wollen (wie implementiert), nutzen wir `checkForUpdates`.
    autoUpdater.checkForUpdates();
  }
} 