import React from 'react';
import './App.css';
import Flashcard from './Flashcard';

function App() {
  return (
    <Flashcard max={4} maxRange={10}></Flashcard>
  );
}

export default App;
