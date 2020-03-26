import React from "react";
import styled from "styled-components";

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
  border-left: 2px solid white;
  border-right: 2px solid white;
  height: 20%;
  width: 20%;

  background-color: blue;
  color: white;

  &:first-child {
    border-left-color: blue;
  }

  &:last-child {
    border-right-color: blue;
  }
`;

const Data = styled.td`
  border: 2px solid blue;
  height: 20%;
  width: 20%;
`;

const Table = styled.table`
  table-layout: fixed;
  width: 500px;
  max-width: 100%;
  border-collapse: collapse;

  margin-bottom: 32px;
`;

const Square = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0px;
  cursor: pointer;

  color: ${p => (p.clicked || p.free ? "red" : "inherit")};

  font-size: ${p => (p.free ? "14px" : "16px")};
`;

const Button = styled.button`
  background-color: blue;
  color: white;
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
      },
      () => {
        window.localStorage.setItem("clicks", JSON.stringify(clicked));
      }
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
    });
  }

  renderHeaderSquare(letter) {
    return (
      <Head>
        <Square>
          <h1>{letter.toUpperCase()}</h1>
        </Square>
      </Head>
    );
  }

  renderSquare(key, number) {
    const { clicked } = this.state;
    return (
      <Data key={key}>
        <Square
          free={key === 12}
          clicked={clicked[key]}
          onClick={() => this._handleClick(key)}
        >
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
    return (
      <>
        <SEO title={"Bingo"} />
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
