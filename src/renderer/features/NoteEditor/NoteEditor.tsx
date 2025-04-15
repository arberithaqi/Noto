// Platzhalter für die Note Editor Komponente (Renderer)
// Hier käme die Logik für Plain Text, Indents, Math, Variablen etc. rein
import React, { useState, ChangeEvent } from 'react';
import { calculateFromString } from '../../utils/contextualMath'; // Import the calculation function

const NoteEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<number | string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = event.target.value;
    setText(currentText);

    // Check if the text ends with "=" (ignoring trailing whitespace)
    if (currentText.trim().endsWith('=')) {
      // Extract the expression part (everything before the last '=')
      const expressionPart = currentText.substring(0, currentText.lastIndexOf('=')).trim();
      console.log('[NoteEditor] Expression part to calculate:', expressionPart);
      if (expressionPart) {
        const calculationResult = calculateFromString(expressionPart);
        console.log('[NoteEditor] Received calculation result:', calculationResult);
        setResult(calculationResult);
      } else {
        setResult(null); // Clear result if only "=" is typed
      }
    } else {
      // If text doesn't end with "=", clear the result
      setResult(null);
    }
  };

  return (
    <div>
      <h2>Note Editor</h2>
      {/* Hier kommt der Editor-Bereich hin */}
      <textarea
        placeholder="Schreibe deine Notiz... (z.B. 5*8=)"
        value={text}
        onChange={handleChange}
        rows={5} // Example size, adjust as needed
        style={{ width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} // Basic styling
      ></textarea>
      {/* Display the result with styling */}
      {result !== null && (
        console.log('[NoteEditor] Rendering result div with:', result),
        <div style={{ marginTop: '10px', padding: '5px', border: '1px solid #eee', borderRadius: '4px' }}>
          Berechnung: <span style={{ color: 'blue', fontWeight: 'bold' }}>{result}</span>
        </div>
      )}
    </div>
  );
};

export default NoteEditor; 