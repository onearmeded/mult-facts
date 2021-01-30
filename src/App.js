import React from 'react';
import './App.css';
import FlashcardGame from './FlashcardGame';

function App() {
  return (
    <FlashcardGame min={0} max={15} maxRange={10} maxMult={3} maxMultRange={12} questions={25} include10={true}/>
  );
}

export default App;
