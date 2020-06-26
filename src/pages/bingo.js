import React from "react";
import styled from "styled-components";
import Confetti from "react-confetti";

import SEO from "../components/seo";

const Wrapper = styled.div`
  max-width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0 20px;
`;

const Row = styled.tr``;

const Head = styled.th`
  border: 0px solid white;
  border: 0px solid white;
  height: 20%;
  width: 20%;

  background-color: rgb(20, 43, 111);
  color: white;

  &:first-child {
    border-left-color: rgb(20, 43, 111);
  }

  &:last-child {
    border-right-color: rgb(20, 43, 111);
  }
`;

const Data = styled.td`
  border: 2px solid
    ${p => (p.clicked || p.free ? "rgb(20, 43, 111)" : "rgb(20, 43, 111)")};
  height: 20%;
  width: 20%;
  background-color: ${p => (p.clicked || p.free ? "transparent" : "white")};
  color: ${p => (p.clicked || p.free ? "white" : "rgb(20, 43, 111)")};
  text-shadow: ${p => (p.clicked || p.free ? "1px 1px rgb(20, 43, 111)" : "")};
`;

const Table = styled.table`
  table-layout: fixed;
  width: 500px;
  max-width: 100%;
  border-collapse: collapse;

  margin-bottom: 32px;
  border-radius: 10px;
`;

const Square = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0px;
  cursor: pointer;

  font-size: ${p => (p.free ? "14px" : "16px")};
`;

const HeadSquare = styled(Square)`
  background-color: transparent;
  color: white;
`;

const Button = styled.button`
  background-color: white;
  color: rgb(20, 43, 111);
  width: 150px;
  height: 40px;

  font-size: 18px;

  outline: none;
  cursor: pointer;
`;

export default class Bingo extends React.Component {
  constructor() {
    super();

    this.state = {
      board: [],
      clicked: [],
    };
  }

  componentDidMount() {
    let savedBoard = window.localStorage.getItem("board");
    let savedClicks = window.localStorage.getItem("clicks");

    if (savedBoard) {
      savedBoard = JSON.parse(savedBoard);
    }

    if (savedClicks) {
      savedClicks = JSON.parse(savedClicks);
    }

    const board = savedBoard || this.generateBoard();

    this.setState({
      board,
      clicked: savedClicks || this.state.clicked,
      confetti: this._checkForConfetti(savedClicks || []),
    });
  }

  generateBoard() {
    this.usedNumbers = [];
    const board = [];
    const letters = ["B", "I", "N", "G", "O"];

    for (let i = 0; i < 5; i++) {
      letters.forEach(letter => {
        if (letter === "N" && i === 2) {
          board.push("Free");
          return;
        }
        board.push(this._getNumberForLetter(letter));
      });
    }

    window.localStorage.setItem("board", JSON.stringify(board));

    return board;
  }

  _getNumberForLetter(letter) {
    switch (letter) {
      case "B":
        return this._getUnusedNumberForRange(1, 15);
      case "I":
        return this._getUnusedNumberForRange(16, 30);
      case "N":
        return this._getUnusedNumberForRange(31, 45);
      case "G":
        return this._getUnusedNumberForRange(46, 60);
      case "O":
        return this._getUnusedNumberForRange(61, 75);
    }
  }

  _getUnusedNumberForRange(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.usedNumbers.includes(number)) {
      return this._getUnusedNumberForRange(min, max);
    } else {
      this.usedNumbers.push(number);
      return number;
    }
  }

  _handleClick(key) {
    const clicked = [...this.state.clicked];
    clicked[key] = !clicked[key];
    this.setState(
      {
        clicked,
        confetti: this._checkForConfetti(clicked),
      },
      () => {
        window.localStorage.setItem("clicks", JSON.stringify(clicked));
      }
    );
  }

  _checkForConfetti(clicked) {
    for (let i = 0; i < clicked.length; i++) {
      if (!clicked[i] || (i > 4 && i % 5)) {
        continue;
      }

      for (let x = -1; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          if (!x && !y) continue;
          if (x === -1 && y === 0) continue;
          const bingo = this._checkSquare(i, clicked, x, y, 1);
          if (bingo) return true;
        }
      }
    }
    return false;
  }

  _checkSquare(i, clicked, directionX, directionY, streak) {
    if (i % 5 === 4 && directionX === 1) {
      return false;
    }

    const nextIndex = i + 5 * directionY + directionX;
    if (!clicked[nextIndex] && nextIndex !== 12) {
      return false;
    }

    const newStreak = streak + 1;
    if (newStreak === 5) {
      return true;
    }
    return this._checkSquare(
      nextIndex,
      clicked,
      directionX,
      directionY,
      newStreak
    );
  }

  _reset() {
    window.localStorage.removeItem("clicks");
    window.localStorage.removeItem("clicks");

    const board = this.generateBoard();
    const clicked = [];
    this.setState({
      board,
      clicked,
      confetti: false,
    });
  }

  renderHeaderSquare(letter) {
    return (
      <Head>
        <HeadSquare>
          <h1>{letter.toUpperCase()}</h1>
        </HeadSquare>
      </Head>
    );
  }

  renderSquare(key, number) {
    const { clicked } = this.state;
    return (
      <Data free={key === 12} clicked={clicked[key]} key={key}>
        <Square clicked={clicked[key]} onClick={() => this._handleClick(key)}>
          <h2>{number}</h2>
        </Square>
      </Data>
    );
  }

  renderHeader() {
    return (
      <Row>
        {this.renderHeaderSquare("B")}
        {this.renderHeaderSquare("I")}
        {this.renderHeaderSquare("N")}
        {this.renderHeaderSquare("G")}
        {this.renderHeaderSquare("O")}
      </Row>
    );
  }

  renderRow(number) {
    const { board } = this.state;

    const offset = number * 5;
    const squares = [];

    for (let i = 0; i < 5; i++) {
      const index = offset + i;
      const value = board.length ? board[index] : "";
      squares.push(this.renderSquare(index, value));
    }
    return <Row>{squares}</Row>;
  }

  render() {
    const { confetti } = this.state;
    return (
      <>
        <SEO title={"Bingo"} />
        {confetti && <Confetti />}
        <Wrapper>
          <Table>
            <thead>{this.renderHeader()}</thead>
            <tbody>
              {this.renderRow(0)}
              {this.renderRow(1)}
              {this.renderRow(2)}
              {this.renderRow(3)}
              {this.renderRow(4)}
            </tbody>
          </Table>
          <Button onClick={() => this._reset()}>New Board</Button>
        </Wrapper>
      </>
    );
  }
}
