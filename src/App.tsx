import React, { useState, useEffect } from "react";
import styled from "styled-components";

import WordDisplay from "./components/WordDisplay";
import { fetchRandomWord } from "./services/fetchWord";

import Confetti from "react-dom-confetti";
import LetterDisplay from "./components/LetterDisplay";

const AppWrapper = styled.div`
  text-align: center;
  padding: 4rem;

  p {
    margin-bottom: 16px;
  }
`;

const Button = styled.button`
  padding: 0 2rem;
  color: #fff;
  background: #000;
  border: none;
  height: 2rem;
  margin: 0.5rem 0;
  border-radius: 1.5rem;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background: #999999;
  }
`;

const Input = styled.input`
  margin: 0.5rem;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #999999;

  &:focus {
    border: 1px solid #000;
    outline: none;
  }
`;

function App() {
  const [targetWord, setTargetWord] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [attempts, setAttempts] = useState<
    {
      guess: string;
      correctLetters: string[];
      misplacedLetters: string[];
      incorrectLetters: string;
    }[]
  >([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [allIncorrectLetters, setAllIncorrectLetters] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [available, setAvailable] = useState(
    Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
  );

  useEffect(() => {
    fetchRandomWordFromService();
  }, []);

  const fetchRandomWordFromService = async () => {
    try {
      const word = await fetchRandomWord();
      setTargetWord(word);
      setAttempts([]);
      setGameWon(false);
      setAllIncorrectLetters("");
      setShowConfetti(false);
      setAttemptsLeft(6);
      setAvailable(
        Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
      );
    } catch (error) {
      console.error("Error fetching random word:", error);
    }
  };

  const handleGuess = () => {
    if (currentGuess.length === 5) {
      const correctLetters: string[] = [];
      const misplacedLetters: string[] = [];

      const incorrectLetters: string[] = [];

      for (let i = 0; i < 5; i++) {
        const guessLetter = currentGuess[i];
        const targetLetter = targetWord[i];

        if (guessLetter === targetLetter) {
          correctLetters.push(guessLetter);
        } else if (targetWord.includes(guessLetter)) {
          misplacedLetters.push(guessLetter);
        } else {
          incorrectLetters.push(guessLetter);
        }
      }

      const isGameWon = correctLetters.length === 5;

      const newAllIncorrectLettersArray = Array.from(
        new Set(allIncorrectLetters + incorrectLetters.join("")),
      );

      newAllIncorrectLettersArray.sort();

      const availableLetters = available.filter(
        (letter) => !newAllIncorrectLettersArray.includes(letter),
      );

      setAvailable(availableLetters);

      const newAllIncorrectLetters = newAllIncorrectLettersArray.join("");

      setAttempts([
        ...attempts,
        {
          guess: currentGuess,
          correctLetters,
          misplacedLetters,
          incorrectLetters: incorrectLetters.join(""),
        },
      ]);

      setCurrentGuess("");
      setAllIncorrectLetters(newAllIncorrectLetters);
      setAttemptsLeft(attemptsLeft - 1);

      if (isGameWon) {
        setGameWon(true);
        setShowConfetti(true);
      }
    }
  };

  console.log(attempts);

  return (
    <AppWrapper>
      <Confetti
        active={showConfetti}
        config={{
          angle: 360,
          spread: 360,
          startVelocity: 40,
          elementCount: 70,
          dragFriction: 0.12,
          duration: 3000,
          stagger: 3,
          width: "10px",
          height: "10px",
        }}
      />
      <h1>"WORDLE"</h1>
      {gameWon && <p>Congratulations, you won! 🎉</p>}
      {!attemptsLeft && (
        <>
          <p>
            You're out of guesses 😭! The word was{" "}
            <b>{targetWord.toUpperCase()}</b>.
          </p>
          <p>Click "New Game" to play again.</p>
        </>
      )}
      {(!attemptsLeft || gameWon) && (
        <Button onClick={fetchRandomWordFromService}>New Game</Button>
      )}
      <WordDisplay targetWord={targetWord} attempts={attempts} />
      <div className="guess-row">
        <Input
          type="text"
          maxLength={5}
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
          disabled={gameWon || !attemptsLeft}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGuess();
            }
          }}
        />
        <Button onClick={handleGuess} disabled={gameWon || !attemptsLeft}>
          Guess
        </Button>
      </div>
      {allIncorrectLetters && (
        <LetterDisplay
          availableLetters={available}
          incorrectLetters={allIncorrectLetters}
        />
      )}
      {attemptsLeft === 6 && (
        <>
          <p>
            Guess the <b>WORDLE</b> in 6 tries.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </>
      )}
    </AppWrapper>
  );
}

export default App;
