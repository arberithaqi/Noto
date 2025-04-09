import React from 'react';
import './styles/global.css'; // Importiere die globalen Styles

// Importiere Views
// import HomeView from './views/HomeView';
// import SettingsView from './views/SettingsView';

// Importiere Komponenten
// import NoteEditor from './features/NoteEditor/NoteEditor';
// import TimerDisplay from './features/Timer/TimerDisplay';

function App() {
  // Hier könnte Routing oder die Hauptansicht der App implementiert werden

  return (
    <div className="App">
      <textarea 
        className="note-editor" 
        placeholder="Schreibe deine Notiz hier...^^"
        spellCheck="false"
        autoFocus
      ></textarea>
      
      {/* Platzhalter für Feature-Komponenten */}
      {/* <NoteEditor /> */}
      {/* <TimerDisplay /> */}
      
      {/* Platzhalter für Views (z.B. mit React Router) */}
      {/* <HomeView /> */}
    </div>
  );
}

export default App; 