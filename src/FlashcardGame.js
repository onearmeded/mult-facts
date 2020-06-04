import React, { useState } from 'react';
import Flashcard from './Flashcard';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Typing from 'react-typing-animation';

export default function FlashcardGame(props)
{
    const [score, setScore] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    const onCorrectAnswer = () => {
        setScore(score + 1);
    }

    const onIncorrectAnswer = () => {
        setIncorrectCount(incorrectCount + 1);
    }

    const currentPercent = () => (score / props.questions) * 100;

    const isWinner = () => score >= props.questions;

    const isPerfectWinner = () => incorrectCount === 0;

    const newGame = _ => {
        setScore(0);
        setIncorrectCount(0);
    }

    const perfectWinnerLayout = (
        <div style={{margin: '1rem'}}>
            <div><img src={ require("./lemon-meringue.png")} alt='Lemon' style={{ height: '425px' }}/></div>
            <Typing><div>Perfect 10, Sugarplum!</div></Typing>
            <Button onClick={newGame} style={{ border: '5px' }}>New Game</Button>
        </div>);


    const winnerLayout = (
        <div style={{margin: '1rem'}}>
            <div><img src={ require("./great-job-star.png")} alt='Great job'/></div>
            <Typing><div>Way to go -- you did it!</div></Typing>
            <Button onClick={newGame} style={{ border: '5px' }}>New Game</Button>
        </div>);

    const gameLayout = (
        <div style={{margin: '1rem'}}>
            <Flashcard max={props.max} maxRange={props.maxRange} min={props.min}
                onCorrectAnswer={onCorrectAnswer} onIncorrectAnswer={onIncorrectAnswer} />
            <div style={{margin:'1rem'}}><ProgressBar now={currentPercent()} label={score} style={{width:'10em'}} /></div>
        </div>
    );

    return isWinner() ? (isPerfectWinner() ? perfectWinnerLayout : winnerLayout) : gameLayout;
}