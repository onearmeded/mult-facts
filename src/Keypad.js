import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function Keypad({onKeyPress}) {
    function makeButton(text) {
        return <Button key={text.toString()} variant='secondary' block style={{margin: '2px' }} onClick={() => onKeyPress({ key: text })}>{text}</Button>;
    }

    function makeColumn(num) { 
        return <Col key={'col'+num} >{makeButton(num)}</Col>;
    }

    function makeRow(start) {
        let cols = [];
        let i = 0;
        for (i = start; i < (start + 3); i++) {
            cols.push(makeColumn(i));
        }

        return <Row key={'row' + start} noGutters='true'>{cols}</Row>;
    }

    function makeKeyPad() { 
        let rows = [];
        let i = 0;
        for (i = 1; i <= 9; i += 3) {
            rows.push(makeRow(i));
        }

        let row = <Row key='row0'>{makeColumn(0)}</Row>;
        rows.push(row);

        row = <Row key='rowX'>{makeColumn('Delete')}{makeColumn('Enter')}</Row>;
        rows.push(row);

        return rows;
    }

    return (
        <Container style={{ width:'5em', fontSize: '36pt', margin: '5px' }} >
            { makeKeyPad() }
        </Container>
    );
}