// Platzhalter für die Note Editor Komponente (Renderer)
// Hier käme die Logik für Plain Text, Indents, Math, Variablen etc. rein
import React from 'react';

const NoteEditor: React.FC = () => {
  return (
    <div>
      <h2>Note Editor</h2>
      {/* Hier kommt der Editor-Bereich hin */}
      <textarea placeholder="Schreibe deine Notiz..."></textarea>
    </div>
  );
};

export default NoteEditor; 