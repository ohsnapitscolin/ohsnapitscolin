import React from "react";
import styled from "styled-components";

import SEO from "../components/seo";

import "../style/snap.css";

const Wrapper = styled.div`
  max-width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: blue;
`;

export default class Index extends React.Component {
  render() {
    return (
      <>
        <SEO title={"Home"} />
        <Wrapper />;
      </>
    );
  }
}
