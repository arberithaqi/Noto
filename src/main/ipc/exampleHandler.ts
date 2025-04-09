import { ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

// IPC-Handler für die Notiz-Speicherung
ipcMain.handle('save-note', async (event, noteContent: string) => {
  // Pfad zum Verzeichnis, in dem die Notizen gespeichert werden
  const notesDir = path.join(__dirname, 'notes');

  // Falls das Verzeichnis noch nicht existiert, lege es an
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
  }

  // Erzeuge einen Zeitstempel für eine eindeutige Dateibenennung
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const noteFile = path.join(notesDir, `note_${timestamp}.txt`);

  // Schreibe den übergebenen Notizinhalt in die Datei
  fs.writeFileSync(noteFile, noteContent, 'utf8');

  // Rückgabe eines Erfolgsergebnisses mit dem Pfad zur gespeicherten Datei
  return { success: true, file: noteFile };
}); 