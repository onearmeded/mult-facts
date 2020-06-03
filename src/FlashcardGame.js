import React, { useState } from 'react';
import Flashcard from './Flashcard';
import ProgressBar from 'react-bootstrap/ProgressBar';

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

    return (
        <div>
            <Flashcard max={props.max} maxRange = {props.maxRange} 
                onCorrectAnswer={onCorrectAnswer} onIncorrectAnswer={onIncorrectAnswer} />
            <div style={{margin:'5px'}}><ProgressBar now={currentPercent()} label={score} style={{width:'10em'}} /></div>
        </div>);
}