import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import useReferredState from './useReferredState';

function Flashcard(props) {
    const [ first, setFirst] = useState(randomInt(props.max));
    const [ second, setSecond ] = useState(randomInt(props.maxRange));
    const [ answer, setAnswer ] = useState('');
    const [ border, setBorder ] = useState('dark');

    useEffect(()=> {
        window.addEventListener("keydown", onKeyDown);
        return () => {
          window.removeEventListener("keydown", onKeyDown);
        } // This return function cleans up the event listener 
      }, [answer, first, second]); 
// try setting the array to actual props

    //const answerRef = useRef(answer);

    // const setAnswer = x => {
    //     answerRef.current = x;
    //     _setAnswer(x);
    // }

    function onKeyDown( { key }) {
        setBorder('dark');

        if (key === "Enter") {
            if (parseInt(answer) === (first * second)) {
                setFirst(randomInt(props.max));
                setSecond(randomInt(props.maxRange));
                setAnswer('');
            }
            else {
                setBorder('danger')
                setAnswer('');
            }
        }
        else {
            setAnswer(answer + key);            
        }
    }

    return (<Card style={{ width:'5em' }} border={border}>
        <Card.Body>
            <div className="text-right">{first}</div>
            <div className="text-right">x {second}</div>
            <hr />
            <div>{answer}</div>
        </Card.Body>
    </Card>);
}

function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

export default Flashcard;