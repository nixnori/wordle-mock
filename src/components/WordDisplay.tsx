import React from "react";
import styled from "styled-components";

const StyledWordDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 16px;
`;

const WordRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LetterSquare = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
  text-transform: uppercase;

  &.correct {
    background-color: #6aaa64;
    color: #fff;
  }

  &.misplaced {
    background-color: #c9b458;
  }
`;

interface WordDisplayProps {
  targetWord: string;
  attempts: {
    guess: string;
    correctLetters: string[];
    misplacedLetters: string[];
  }[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ targetWord, attempts }) => (
  <StyledWordDisplay>
    {attempts.map((attempt, attemptIndex) => (
      <WordRow key={attemptIndex}>
        {attempt.guess.split("").map((letter, letterIndex) => (
          <LetterSquare
            key={letterIndex}
            className={
              attempt.correctLetters.includes(letter)
                ? "correct"
                : attempt.misplacedLetters.includes(letter)
                ? "misplaced"
                : ""
            }
          >
            {letter}
          </LetterSquare>
        ))}
      </WordRow>
    ))}
    <WordRow>
      {targetWord.split("").map((letter, letterIndex) => (
        <LetterSquare key={letterIndex} className="" />
      ))}
    </WordRow>
  </StyledWordDisplay>
);

export default WordDisplay;
