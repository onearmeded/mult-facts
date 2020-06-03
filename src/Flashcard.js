import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

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


    function onKeyDown( { key }) {
        setBorder('dark');

        if (key === "Enter") {
            if (parseInt(answer) === (first * second)) {
                setFirst(randomInt(props.max));
                setSecond(randomInt(props.maxRange));
                setAnswer('');
                props.onCorrectAnswer();
            }
            else {
                setBorder('danger')
                setAnswer('');
                props.onIncorrectAnswer();
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
            <div className="text-right">{answer}</div>
        </Card.Body>
    </Card>);
}

function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

export default Flashcard;