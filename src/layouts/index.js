import React from "react";

import "../style/snap.scss";

export default class Layout extends React.Component {
  render() {
    return <>{this.props.children}</>;
  }
}
