import React, { useState, useCallback, useRef, ChangeEvent } from 'react';
import './styles/global.css'; // Importiere die globalen Styles
import PaginationDots from './components/PaginationDots';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import { calculateFromString } from './utils/contextualMath'; // <-- Import the utility function

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
  const [result, setResult] = useState<number | string | null>(null); // <-- Add state for the calculation result
  
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
  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = event.target.value;
    let finalContent = updatedContent;

    // Calculation Logic
    if (updatedContent.trim().endsWith('=')) {
      const expressionPart = updatedContent.substring(0, updatedContent.lastIndexOf('=')).trim();
      console.log('[App] Expression part to calculate:', expressionPart);
      if (expressionPart) {
        const calculationResult = calculateFromString(expressionPart);
        console.log('[App] Received calculation result:', calculationResult);
        setResult(calculationResult);
        
        // Append the result to the content right after the equals sign
        // Use regex to ensure we only have one space after the equals sign
        // Add brackets around the result to make it distinguishable
        finalContent = updatedContent.replace(/\s*=\s*$/, '=') + ' ' + calculationResult;
      } else {
        setResult(null); 
      }
    } else {
      setResult(null);
    }

    // Update note content state with possibly modified content
    setNotes(prevNotes => {
      const newNotes = [...prevNotes];
      // Ensure the index is valid before updating
      if (newNotes[currentNoteIndex]) {
         newNotes[currentNoteIndex] = {
           ...newNotes[currentNoteIndex],
           content: finalContent
         };
      }
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
      
      {/* Only display the calculation result visually if needed for debugging */}
      {/* {result !== null && (
        console.log('[App] Rendering result div with:', result),
        <div style={{ marginTop: '10px', padding: '5px', border: '1px solid #eee', borderRadius: '4px', color: 'var(--text-color)' }}>
          Berechnung: <span style={{ color: 'blue', fontWeight: 'bold' }}>{result}</span>
        </div>
      )} */}

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