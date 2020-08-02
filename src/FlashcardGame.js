import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from './Flashcard';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Typing from 'react-typing-animation';
import Prize from './Prize';
import Keypad from './Keypad';

export default function FlashcardGame(props)
{
    const [score, setScore] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [ answer, setAnswer ] = useState('');
    const [ answerComplete, setAnswerComplete ] = useState(false);
    const [ first, setFirst] = useState(randomInt(props.max, props.min));
    const [ second, setSecond ] = useState(randomInt(props.maxRange, props.min));
    const [ operation, setOperation ] = useState('+');

    const onCorrectAnswer = () => {
        setScore(score + 1);
        setAnswer('');
        setAnswerComplete(false);
    }

    const onIncorrectAnswer = () => {
        setIncorrectCount(incorrectCount + 1);
        setAnswer('');
        setAnswerComplete(false);
    }

    const currentPercent = () => (score / props.questions) * 100;

    const isWinner = () => score >= props.questions;

    const isPerfectWinner = () => incorrectCount === 0;

    const newGame = _ => {
        setScore(0);
        setIncorrectCount(0);
    }

    const onKeypadButton = useCallback(keyEvt =>  {
        const {key} = keyEvt;
        console.log("Got keypad: " + key)

        if (key === "Enter") {
            setAnswerComplete(true);
        }
        else if (key === "Backspace" || key === "Delete") {
            if (answer.length > 0) {
                setAnswer(answer.slice(0, -1));
            }
        }
        else if (key < 10) { // check if key is a digit
            setAnswer(answer + key);            
        }
    }, [answer]);


    const [ border, setBorder ] = useState('dark');

    const onKeyDown = useCallback( keyEvt => 
    {
        console.log("Got keypress: " + keyEvt.key)
        onKeypadButton(keyEvt);

    }, [onKeypadButton]);

    useEffect(()=> {
        window.addEventListener("keydown", onKeyDown);
        return () => {
          window.removeEventListener("keydown", onKeyDown);
        } // This return function cleans up the event listener 
      }, [onKeyDown, onKeypadButton]); 


    const chooseOperation = () => {
        const operations = ['-', '+'];
        let index = randomInt(operations.length - 1);
        return operations[index];
    }

    const newProblem = () => {
        let newFirst = randomInt(props.max, props.min);
        let newSecond = randomInt(props.maxRange, props.min);
        let newOperation = chooseOperation();

        if (newOperation === '-') {
            if (newFirst < newSecond) {
                [newSecond, newFirst] = [newFirst, newSecond];
            }
        }

        if (newFirst === first && newSecond === second) {
            newProblem();
        }
        else {
            setFirst(newFirst);
            setSecond(newSecond);
            setOperation(newOperation);
        }
    }

    const verifyAnswer = () => {
        let correctAnswer = -1;
        switch (operation) {
            case 'x':
                correctAnswer = first * second;
                break;

            case '+':
                correctAnswer = first + second;
                break;

            case '-':
                correctAnswer = first - second;
                break;

            case '/':
                correctAnswer = first / second;
                break;
            
            default:
                throw new Error("Unexpected operation");

        }

        return parseInt(answer) === correctAnswer;
    }

    if (answerComplete) {
        if (verifyAnswer()) {
            onCorrectAnswer();
            newProblem();            
        }
        else {
            onIncorrectAnswer();
            setBorder('danger')
        }
    }

    const perfectWinnerLayout = (
        <div style={{margin: '1rem'}}>
            <div><img src={ require("./lemon-meringue.png")} alt='Lemon' style={{ height: '425px' }}/></div>
            <Typing><div>Perfect 10, Sugarplum!</div></Typing>
            <Prize/>
            <Button onClick={newGame} style={{ border: '5px' }}>New Game</Button>
        </div>);


    const winnerLayout = (
        <div style={{margin: '1rem'}}>
            <div><img src={ require("./great-job-star.png")} alt='Great job'/></div>
            <Typing><div>Way to go -- you did it!</div></Typing>
            <Prize/>
            <Button onClick={newGame} style={{ border: '5px' }}>New Game</Button>
        </div>);

    const gameLayout = (
        <div style={{margin: '1rem'}}>
            <Flashcard first={first} second={second} answer={answer} operation={operation} />
            <div style={{margin:'1rem'}}><ProgressBar now={currentPercent()} label={score} style={{width:'10em'}} /></div>
            <Keypad onKeyPress={onKeypadButton}/>
        </div>
    );

    return isWinner() ? (isPerfectWinner() ? perfectWinnerLayout : winnerLayout) : gameLayout;
}

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}