import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';

function Flashcard(props) {
    const [ first, setFirst] = useState(randomInt(props.max, props.min));
    const [ second, setSecond ] = useState(randomInt(props.maxRange, props.min));
    const [ answer, setAnswer ] = useState('');
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

    const newProblem = () => {
        let newFirst = randomInt(props.max, props.min);
        let newSecond = randomInt(props.maxRange, props.min);

        if (newFirst === first && newSecond === second) {
            newProblem();
        }
        else {
            setFirst(newFirst);
            setSecond(newSecond);
        }
    }

    const getClassName = () => (border === "danger" ? "bg-danger" : "bg-primary") + " text-light font-weight-bold";

    if (answerComplete) {
        if (parseInt(answer) === (first * second)) {
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

    return (<Card style={{ width:'5em' }} border={border} className={getClassName()}>
        <Card.Body>
            <div className="text-right">{first}</div>
            <div className="text-right">x {second}</div>
            <hr />
            <div className="text-right">{answer}</div>
        </Card.Body>
    </Card>);
}

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Flashcard;