import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";

import SEO from "../components/seo";

const Wrapper = styled.div`
  max-width: 100%;
  height: 100%;
`;

const Centered = styled.div`
  background-color: blue;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spread = styled.div`
  background-color: blue;
  min-height: 100%;

  padding: 80px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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

  margin-bottom: 32px;
`;

const InverseButton = styled.button`
  background-color: blue;
  color: white;
  width: 150px;
  height: 40px;
  border: white solid 1px;

  font-size: 18px;

  outline: none;
  cursor: pointer;

  margin-bottom: 32px;
`;

const CalledNumbers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
    margin-bottom: 8px;
    font-size: 28px;
    color: white;
  }

  margin-bottom: 32px;
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

  toggleVerify() {
    this.setState({
      verify: !this.state.verify,
    });
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
    if (this.usedNumbers[number]) {
      return this._getUnusedNumberForRange(min, max, remove);
    } else {
      if (remove) {
        this.usedNumbers[number] = true;
      }
      return number;
    }
  }

  render() {
    const { verify, letter, number, processing } = this.state;
    return (
      <>
        <SEO title={"Host"} />
        <Wrapper>
          {!verify && (
            <Centered>
              <Number>
                {letter}
                {number}
              </Number>
              <Button disabled={processing} onClick={() => this.next()}>
                Go
              </Button>
              <InverseButton
                disabled={processing}
                onClick={() => this.toggleVerify()}
              >
                Called
              </InverseButton>
            </Centered>
          )}
          {verify && (
            <Spread>
              <CalledNumbers>
                {this.usedNumbers.map((number, i) => {
                  if (!number) return;
                  return (
                    <p key={i}>
                      {this._getLetterForNumber(i)}
                      {i}
                    </p>
                  );
                })}
              </CalledNumbers>
              <InverseButton
                disabled={processing}
                onClick={() => this.toggleVerify()}
              >
                Back
              </InverseButton>
            </Spread>
          )}
        </Wrapper>
      </>
    );
  }
}
