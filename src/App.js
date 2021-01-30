import React from 'react';
import './App.css';
import FlashcardGame from './FlashcardGame';

function App() {
  return (
    <FlashcardGame min={1} max={15} maxRange={10} maxMultRange={12} possibleMultValues={[0,1,2,3,5,10]} questions={25} />
  );
}

export default App;
