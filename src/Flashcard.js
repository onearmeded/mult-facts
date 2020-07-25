import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';

function Flashcard(props) {
    const [ first, setFirst] = useState(randomInt(props.max, props.min));
    const [ second, setSecond ] = useState(randomInt(props.maxRange, props.min));
    const [ answer, setAnswer ] = useState('');
    const [ operation, setOperation ] = useState('x');
    const [ border, setBorder ] = useState('dark');
    const [ answerComplete, setAnswerComplete ] = useState(false);

    const onKeyDown = useCallback( keyEvt => 
    {
        const {key} = keyEvt;
        setBorder('dark');

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

    useEffect(()=> {
        window.addEventListener("keydown", onKeyDown);
        return () => {
          window.removeEventListener("keydown", onKeyDown);
        } // This return function cleans up the event listener 
      }, [answer, answerComplete, onKeyDown]); 


    const chooseOperation = () => {
        const operations = ['x', '+'];
        let index = randomInt(operations.length - 1);
        return operations[index];
    }

    const newProblem = () => {
        let newFirst = randomInt(props.max, props.min);
        let newSecond = randomInt(props.maxRange, props.min);

        if (newFirst === first && newSecond === second) {
            newProblem();
        }
        else {
            setFirst(newFirst);
            setSecond(newSecond);
            setOperation(chooseOperation());
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

    const getClassName = () => (border === "danger" ? "bg-danger" : "bg-primary") + " text-light font-weight-bold";

    if (answerComplete) {
        if (verifyAnswer()) {
            newProblem();
            setAnswer('');
            props.onCorrectAnswer();
        }
        else {
            setBorder('danger')
            setAnswer('');
            props.onIncorrectAnswer();
        }

        setAnswerComplete(false);
    }

    return (<Card style={{ width:'5em', fontSize: '36pt' }} border={border} className={getClassName()}>
        <Card.Body>
            <div className="text-right">{first}</div>
            <div className="text-right">{operation} {second}</div>
            <hr />
            <div className="text-right">{answer}</div>
            <div style={{visibility: 'hidden'}}><input type='tel' style={{height:'0px'}} autoFocus/> </div>
        </Card.Body>
    </Card>);
}

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Flashcard;