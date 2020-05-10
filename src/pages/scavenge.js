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
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 500px;
  max-width: 100%;

  h1 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 1.5em;

    ${responsive.sm`
      font-size: 2em;
    `}
  }

  h2 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 1em;

    ${responsive.sm`
      font-size: 1.5em;
    `}
  }
`;

const Find = styled.div`
  width: 10%;
  ${responsive.sm`
    width: 20%;
  `}

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  margin-right: 16px;

  white-space: nowrap;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  white-space: nowrap;
`;

const Check = styled.h2`
  cursor: pointer;
  visibility: ${p => (p.done ? "visible" : "hidden")};
  color: red;
`;

const Item = styled.h2`
  cursor: pointer;
  opacity: ${p => (p.done ? 0.24 : 0.56)};
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

const Questions = [
  "that reminds you of Todd Dunn",
  "with a face (not a person)",
  "cold",
  "your forgot you had",
  "embarassing",
  "that's 15 letters longs",
  "that's 15-20 inches long",
  "you got as a present",
  "you made",
  "from your childhood",
  "that comes in a pack",
  "that has instructions on it",
  "that's golden",
  "that started with the letter Q",
];

export default class Scavenge extends React.Component {
  constructor() {
    super();

    this.questions = this.shuffle(Questions);

    this.state = {
      started: false,
      done: new Array(this.questions.length),
    };
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleClick(i) {
    const updatedDone = [...this.state.done];
    updatedDone[i] = !this.state.done[i];

    this.setState({
      done: updatedDone,
    });
  }

  start() {
    this.setState({
      started: true,
    });
  }

  render() {
    const { done, started } = this.state;

    if (!started) {
      return (
        <>
          <SEO title={"Scavenge"} />
          <Wrapper>
            <Button onClick={() => this.start()}>Start</Button>
          </Wrapper>
        </>
      );
    }
    return (
      <>
        <SEO title={"Scavenge"} />
        <Wrapper>
          <Container>
            <Find>
              {done.map((value, i) => (
                <Check onClick={() => this.handleClick(i)} key={i} done={value}>
                  +
                </Check>
              ))}
            </Find>
            <List>
              <h1>Find something...</h1>
              {this.questions.map((item, i) => (
                <Item
                  onClick={() => this.handleClick(i)}
                  key={i}
                  done={done[i]}
                >
                  {item}
                </Item>
              ))}
            </List>
          </Container>
        </Wrapper>
      </>
    );
  }
}
