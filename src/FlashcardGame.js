import React, { useState } from 'react';
import Flashcard from './Flashcard';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

export default function FlashcardGame(props)
{
    const [score, setScore] = useState(0);

    const onCorrectAnswer = () => {
        setScore(score + 1);
        console.log("Correct");
    }

    const onIncorrectAnswer = () => {
        console.log("Incorrect");
    }

    const currentPercent = () => (score / props.questions) * 100;

    const isWinner = () => score >= props.questions;

    const newGame = _ => setScore(0);

    const winnerLayout = (
        <div>
            <div>You win!</div>
            <Button onClick={newGame}>New Game</Button>
        </div>);

    const gameLayout = (
        <div>
            <Flashcard max={props.max} maxRange = {props.maxRange} 
                onCorrectAnswer={onCorrectAnswer} onIncorrectAnswer={onIncorrectAnswer} />
            <div style={{margin:'5px'}}><ProgressBar now={currentPercent()} label={score} style={{width:'10em'}} /></div>
        </div>
    );

    return isWinner() ? winnerLayout : gameLayout;
}