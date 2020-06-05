import React, { useState } from 'react'
import Typing from 'react-typing-animation';
import Button from 'react-bootstrap/Button';

export default function Prize(props) {
    const [prizeShown, setPrizeShown] = useState(false);
    const [typingShown, setTypingShown] = useState(false);
    const [prize, setPrize] = useState(null);

    const prizes = [
        "One piece of candy",
        "Two pieces of candy",
        "15 minutes of screentime",
        "30 minutes of screentime",
        "20 minutes of Mom or Dad playing with you",
        "Choose your own drink at dinner"
    ]

    const onReveal = () => { console.log("Showing text"); setTypingShown(true); }
    const onTypingComplete = () => { 
        console.log("Showing prize");
        setTypingShown(false); 
        selectPrize(); 
        console.log(prize);
        setPrizeShown(true); 
    }

    const randomInt = max => Math.floor(Math.random() * max);

    const selectPrize = () => setPrize(prizes[randomInt(prizes.length)]);

    return (prizeShown ? <div border='bg-dark' className='lead bg-secondary text-light w-50 border border-dark rounded'>{prize}</div> :
        typingShown ? <Typing speed={75} startDelay={750} onFinishedTyping={onTypingComplete}>
            <div>Your prize is... Wait for it...</div>
            </Typing> :
        <div><Button onClick={onReveal}>Show my prize!</Button></div>
    );

}