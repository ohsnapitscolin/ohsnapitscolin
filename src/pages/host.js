import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";

import SEO from "../components/seo";

const Wrapper = styled.div`
  max-width: 100%;
  height: 100%;
`;

const Centered = styled.div`
  background-color: transparent;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-shadow: 2px 2px rgb(20, 43, 111);
`;

const Spread = styled.div`
  background-color: transparent;
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
  color: rgb(20, 43, 111);
  width: 150px;
  height: 40px;

  font-size: 18px;

  outline: none;
  cursor: pointer;

  margin-bottom: 32px;
`;

const InverseButton = styled.button`
  background-color: rgb(20, 43, 111);
  color: white;
  width: 150px;
  height: 40px;
  border: white solid 1px;

  font-size: 18px;

  outline: none;
  cursor: pointer;

  margin-bottom: 32px;
`;

const Row = styled.tr`
  color: white;
`;

const Head = styled.th`
  border-left: 2px solid white;
  border-right: 2px solid white;
  height: 20%;
  width: 20%;

  background-color: white;
  color: rgb(20, 43, 111);

  &:first-child {
    border-left-color: white;
  }

  &:last-child {
    border-right-color: white;
  }
`;

const Data = styled.td`
  border: 2px solid white;
  height: 20%;
  width: 20%;

  color: ${p => (p.called ? "rgb(20, 43, 111)" : "inherit")};
  background-color: ${p => (p.called ? "white" : "inherit")};
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

  color: ${p => (p.called ? "red" : "inherit")};
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

  renderHeaderSquare(letter) {
    return (
      <Head>
        <Square>
          <h1>{letter.toUpperCase()}</h1>
        </Square>
      </Head>
    );
  }

  renderSquare(number) {
    return (
      <Data called={this.usedNumbers[number]} key={number}>
        <Square>
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

  renderRow(index) {
    const squares = [];

    for (let i = 0; i < 5; i++) {
      squares.push(this.renderSquare(i * 15 + index));
    }
    return <Row key={index}>{squares}</Row>;
  }

  render() {
    const { verify, letter, number, processing } = this.state;

    if (verify) {
      const rows = [];
      for (let i = 1; i <= 15; i++) {
        rows.push(this.renderRow(i));
      }
      return (
        <>
          <SEO title={"Host"} />
          <Wrapper>
            <Spread>
              <Table>
                <thead>{this.renderHeader()}</thead>
                <tbody>{rows}</tbody>
              </Table>
              <Button onClick={() => this.toggleVerify()}>Back</Button>
            </Spread>
          </Wrapper>
        </>
      );
    }

    return (
      <>
        <SEO title={"Host"} />
        <Wrapper>
          <Centered>
            <Number>
              {letter}
              {number}
            </Number>
            <Button disabled={processing} onClick={() => this.next()}>
              Go
            </Button>
            <InverseButton onClick={() => this.toggleVerify()}>
              Called
            </InverseButton>
          </Centered>
        </Wrapper>
      </>
    );
  }
}
