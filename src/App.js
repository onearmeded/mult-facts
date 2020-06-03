import React from 'react';
import './App.css';
import FlashcardGame from './FlashcardGame';

function App() {
  return (
    <FlashcardGame max={4} maxRange={10} questions={25}/>
  );
}

export default App;
