// Dieser Code wird im Renderer-Prozess ausgeführt (im Browserfenster).

document.addEventListener('DOMContentLoaded', () => {
  const noteArea = document.getElementById('note-area') as HTMLTextAreaElement;

  if (noteArea) {
    // Lade gespeicherte Notizen beim Start
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      noteArea.value = savedNote;
    }

    // Speichere Notizen bei jeder Eingabe
    noteArea.addEventListener('input', () => {
      localStorage.setItem('note', noteArea.value);
    });
  }
});
