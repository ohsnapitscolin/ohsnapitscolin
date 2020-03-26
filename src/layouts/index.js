import React from "react";

import "../style/snap.css";

export default class Layout extends React.Component {
  render() {
    return <>{this.props.children}</>;
  }
}
