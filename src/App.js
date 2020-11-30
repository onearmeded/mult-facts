import React from 'react';
import './App.css';
import FlashcardGame from './FlashcardGame';

function App() {
  return (
    <FlashcardGame min={2} max={15} maxRange={10} questions={25}/>
  );
}

export default App;
