import React, { useState, useCallback, useRef } from 'react';
import './styles/global.css'; // Importiere die globalen Styles
import PaginationDots from './components/PaginationDots';
import { useSwipeGesture } from './hooks/useSwipeGesture';

// Importiere Views
// import HomeView from './views/HomeView';
// import SettingsView from './views/SettingsView';

// Importiere Komponenten
// import NoteEditor from './features/NoteEditor/NoteEditor';
// import TimerDisplay from './features/Timer/TimerDisplay';

// Interface for a note
interface Note {
  id: string;
  content: string;
}

function App() {
  // State for managing notes
  const [notes, setNotes] = useState<Note[]>([
    { id: `note-${Date.now()}`, content: '' }
  ]);
  
  // State for tracking the current note index
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  
  // Reference to the textarea 
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Add a new note
  const addNote = useCallback(() => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: ''
    };
    
    setNotes(prevNotes => [...prevNotes, newNote]);
    // Switch to the new note
    setCurrentNoteIndex(notes.length);
    
    // Focus the textarea after adding a new note
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  }, [notes.length]);

  // Handle note content changes
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = event.target.value;
    setNotes(prevNotes => {
      const newNotes = [...prevNotes];
      newNotes[currentNoteIndex] = {
        ...newNotes[currentNoteIndex],
        content: updatedContent
      };
      return newNotes;
    });
  };

  // Navigate to a specific note
  const navigateToNote = (index: number) => {
    if (index >= 0 && index < notes.length) {
      setCurrentNoteIndex(index);
      // Focus the textarea after switching note
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 50);
    }
  };

  // Handle swipe gesture
  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (direction === 'left') {
      // Navigate to next note or create new one
      if (currentNoteIndex < notes.length - 1) {
        navigateToNote(currentNoteIndex + 1);
      } else {
        addNote();
      }
    } else if (direction === 'right' && currentNoteIndex > 0) {
      // Navigate to previous note
      navigateToNote(currentNoteIndex - 1);
    }
  }, [currentNoteIndex, notes.length, addNote]);

  // Use our custom hook for swipe gestures
  useSwipeGesture(handleSwipe, { 
    direction: 'horizontal', 
    threshold: 30,
    cooldown: 500
  });

  return (
    <div className="App">
      <textarea 
        ref={textareaRef}
        className="note-editor" 
        placeholder="Schreibe deine Notiz hier ^^"
        spellCheck="false"
        autoFocus
        value={notes[currentNoteIndex]?.content || ''}
        onChange={handleNoteChange}
      />
      
      <PaginationDots 
        currentIndex={currentNoteIndex}
        totalCount={notes.length}
        onDotClick={navigateToNote}
      />
      
      {/* Platzhalter für Feature-Komponenten */}
      {/* <NoteEditor /> */}
      {/* <TimerDisplay /> */}
      
      {/* Platzhalter für Views (z.B. mit React Router) */}
      {/* <HomeView /> */}
    </div>
  );
}

export default App; 