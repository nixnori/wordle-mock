import React from "react";
import styled from "styled-components";

const LetterContainer = styled.div`
  h3 {
    margin: 20px 0 4px;
  }

  span {
    letter-spacing: 10px;
    text-transform: uppercase;
    word-wrap: break-word;
    line-height: 32px;
  }

  .incorrect {
    color: #cc0000;
  }
`;

interface LetterDisplayProps {
  availableLetters: string[];
  incorrectLetters: string;
}

const LetterDisplay: React.FC<LetterDisplayProps> = ({
  availableLetters,
  incorrectLetters,
}) => (
  <>
    <LetterContainer>
      <h3>Available Letters:</h3>
      <span>{availableLetters}</span>
    </LetterContainer>
    <LetterContainer>
      <h3 className="incorrect">All Incorrect Letters:</h3>
      <span className="incorrect">{incorrectLetters}</span>
    </LetterContainer>
  </>
);

export default LetterDisplay;
