import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

function Flashcard({ first, second, answer, operation }) {
    let border = 'dark';
    const getClassName = () =>  (border === "danger" ? "bg-danger" : "bg-primary") + " text-light font-weight-bold";

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



export default Flashcard;