//App.js 
import React, { useState, useEffect } from "react"; 
import "./App.css"; 
import sampleWords from "./Data/Words"
  
const getRandomWord = () => { 
    const randomPlace = Math.floor(Math.random() * sampleWords.length); 
    sampleWords[randomPlace].word = sampleWords[randomPlace].word.toUpperCase();
    return sampleWords[randomPlace]; 
}; 
  
const WordGame = () => { 
    const [wordData, setWordData] = useState(getRandomWord()); 
    const [msg, setMsg] = useState(""); 
    const [chosenLetters, setChosenLetters] = useState([]); 
    const [hints, setHints] = useState(3); 
    const [displayWord, setDisplayWord] = useState(false); 
    const [chances, setChances] = useState(3);
    const [wrongGuesses, setWrongGuesses] = useState(0); 
  
    useEffect(() => { 
        if (wrongGuesses >= 3) { 
            window.alert("Game Over! You made too many wrong guesses."); 
            guessFunction();
        } 
    }, [wrongGuesses]); 
  
    const letterSelectFunction = (letter) => { 
        if (!chosenLetters.includes(letter)) { 
            setChosenLetters([...chosenLetters, letter]); 
            if (!wordData.word.includes(letter)) { 
                setWrongGuesses(wrongGuesses + 1); 
                setChances(chances - 1);
            } 
        } 
    }; 
  
    const hintFunction = () => { 
        if (hints > 0) { 
            const hiddenLetterIndex = wordData.word 
                .split("") 
                .findIndex((letter) => !chosenLetters.includes(letter)); 
            setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]); 
            setHints(hints - 1); 
        } 
    }; 
  
    const removeCharacterFunction = () => { 
        setChosenLetters(chosenLetters.slice(0, -1)); 
    }; 
  
    const displayLettersFunction = () => { 
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
  
        return Array.from(letters).map((letter, index) => ( 
            <button 
                key={index} 
                onClick={() => letterSelectFunction(letter)} 
                disabled={chosenLetters.includes(letter)} 
                className={`letter-button ${ 
                    chosenLetters.includes(letter) ? "selected" : ""
                }`} 
            > 
                {letter} 
            </button> 
        )); 
    }; 
  
    const checkWordGuessedFunction = () => { 
        return wordData.word.split("").every((letter) => chosenLetters.includes(letter)); 
    }; 
  
    const guessFunction = () => { 
        if (checkWordGuessedFunction()) { 
            setMsg("Congo! You have guessed the word correctly!"); 
        } else { 
            setMsg("You made a Wrong Guess!. Try again!"); 
            setDisplayWord(true); 
        } 
    }; 
  
    const restartGameFunction = () => { 
        setWordData(getRandomWord()); 
        setMsg(""); 
        setChosenLetters([]); 
        setHints(3); 
        setDisplayWord(false); 
        setWrongGuesses(0); 
        setChances(3);
    }; 
  
    return ( 
        <div className="container"> 
            <h1>Word Guess Game</h1> 
            <div className="word-container"> 
                {Array.from(wordData.word).map((letter, index) => ( 
                    <div 
                        key={index} 
                        className={`letter ${ 
                            chosenLetters.includes(letter) ? "visible" : ""
                        }`} 
                    > 
                        {chosenLetters.includes(letter) ? letter : ""} 
                    </div> 
                ))} 
            </div> 
            <p className="word-description">Hint: {wordData.description}</p> 
            {msg && ( 
                <div className="message"> 
                    <p>{msg}</p> 
                    {displayWord && <p>Correct word was: {wordData.word}</p>} 
                </div> 
            )} 
            <div className="button-section"> 
                <div className="guess-section"> 
                    <button 
                        onClick={restartGameFunction} 
                        className="restart-button"
                    > 
                        Restart 
                    </button> 
                    <button 
                        onClick={removeCharacterFunction} 
                        disabled={!chosenLetters.length} 
                        className="remove-button"
                    > 
                        Remove Letter 
                    </button> 
                </div> 
                <div className="letter-selection"> 
                    {displayLettersFunction()} 
                </div> 
                <div className="hints"> 
                    Hints Remaining: {hints}{" "} 
                    <button 
                        onClick={hintFunction} 
                        disabled={hints === 0} 
                        className="hint-button"
                    > 
                        Get Hint 
                    </button> 
                </div> 
                <div className="hints"> 
                    Chances Remaining: {chances}{" "}  
                </div> 
                {!msg && ( 
                    <button 
                        onClick={guessFunction} 
                        disabled={!chosenLetters.length} 
                        className="guess-button"
                    > 
                        Guess 
                    </button> 
                )} 
            </div> 
        </div> 
    ); 
}; 
  
export default WordGame; 