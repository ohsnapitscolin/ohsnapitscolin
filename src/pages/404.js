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

  background-color: blue;
`;

export default class FourOhFour extends React.Component {
  render() {
    return (
      <>
        <SEO title={"404"} />
        <Wrapper />;
      </>
    );
  }
}
