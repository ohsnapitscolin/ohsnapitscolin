import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";

import SEO from "../components/seo";

const Wrapper = styled.div`
  max-width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0 20px;

  background-color: blue;
`;

const Number = styled.h1`
  margin: 0;
  color: white;
  font-size: 108px;
  ${responsive.sm`
    font-size: 196px;
  `}
`;

const Button = styled.button`
  background-color: white;
  color: blue;
  width: 150px;
  height: 40px;

  font-size: 18px;

  outline: none;
  cursor: pointer;
`;

export default class Board extends React.Component {
  constructor() {
    super();

    this.usedNumbers = [];
    this.state = {
      letter: "BINGO",
      number: "",
      processing: false,
    };
  }

  next() {
    if (this.state.processing) return;
    this.setState({
      processing: true,
    });
    this._getNext(25, false);
  }

  _getNext(i, remove) {
    if (this.usedNumbers.length === 75) {
      return;
    }

    const number = this._getUnusedNumberForRange(1, 75, remove);
    const letter = this._getLetterForNumber(number);

    this.setState({
      number,
      letter,
    });

    if (!remove) {
      setTimeout(() => {
        this._getNext(i - 1, i === 0);
      }, 75);
    } else {
      this.setState({
        processing: false,
      });
    }
  }

  _getLetterForNumber(number) {
    if (number <= 15) {
      return "B";
    } else if (number <= 30) {
      return "I";
    } else if (number <= 45) {
      return "N";
    } else if (number <= 60) {
      return "G";
    } else if (number <= 75) {
      return "O";
    }
  }

  _getUnusedNumberForRange(min, max, remove) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.usedNumbers.includes(number)) {
      return this._getUnusedNumberForRange(min, max, remove);
    } else {
      if (remove) {
        this.usedNumbers.push(number);
      }
      return number;
    }
  }

  render() {
    const { letter, number, processing } = this.state;
    return (
      <>
        <SEO title={"Host"} />
        <Wrapper>
          <Number>
            {letter}
            {number}
          </Number>
          <Button disabled={processing} onClick={() => this.next()}>
            Go
          </Button>
        </Wrapper>
      </>
    );
  }
}
