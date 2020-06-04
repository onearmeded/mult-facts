import React from 'react';
import './App.css';
import FlashcardGame from './FlashcardGame';

function App() {
  return (
    <FlashcardGame min={2} max={5} maxRange={10} questions={3}/>
  );
}

export default App;
