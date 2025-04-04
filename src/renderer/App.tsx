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
      {/* <h1>Noto App</h1> */}
      {/* <p>Minimalistisches Notiz-App Grundgerüst</p> */}
      <textarea className="note-editor" placeholder="Schreibe deine Notiz hier..."></textarea>
      
      {/* Platzhalter für Feature-Komponenten */}
      {/* <NoteEditor /> */}
      {/* <TimerDisplay /> */}
      
      {/* Platzhalter für Views (z.B. mit React Router) */}
      {/* <HomeView /> */}
    </div>
  );
}

export default App; 