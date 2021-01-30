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
    const [ first, setFirst] = useState(randomInt(props.maxMult, props.min));
    const [ second, setSecond ] = useState(randomInt(props.maxMultRange, props.min));
    const [ operation, setOperation ] = useState('x');
    const [ border, setBorder ] = useState('dark');
    let include10 = props.include10 ? true : false;

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

        setBorder("dark");

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

    const onKeyDown = useCallback( keyEvt => 
    {
        onKeypadButton(keyEvt);

    }, [onKeypadButton]);

    useEffect(()=> {
        window.addEventListener("keydown", onKeyDown);
        return () => {
          window.removeEventListener("keydown", onKeyDown);
        } // This return function cleans up the event listener 
      }, [onKeyDown, onKeypadButton]); 


    const chooseOperation = () => {
        const operations = ['x'] // ['x', '+', '-'];
        let index = randomInt(operations.length - 1);
        return operations[index];
    }

    const newProblem = () => {
        let newOperation = chooseOperation();
        // If we are including 10 in possible multiplication facts, use max + 1 to represent 10
        let max = (newOperation === 'x') ? (include10 ? props.maxMult + 1 : props.maxMult) : props.max;
        let newFirst = newOperation === 'x' ? randomInt(max, props.min) : randomInt(max, props.min);
        let newSecond = newOperation === 'x' ? randomInt(props.maxMultRange, props.min) : randomInt(props.maxRange, props.min);

        // If we are doing multiplication and we got max + 1, switch it to 10
        if (newOperation === 'x' && newFirst === props.maxMult + 1) {
            newFirst = 10;
        }


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
            <Flashcard first={first} second={second} answer={answer} operation={operation} border={border} />
            <div style={{margin:'1rem'}}><ProgressBar now={currentPercent()} label={score} style={{width:'10em'}} /></div>
            <Keypad onKeyPress={onKeypadButton}/>
        </div>
    );

    return isWinner() ? (isPerfectWinner() ? perfectWinnerLayout : winnerLayout) : gameLayout;
}

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}