import React, { Component } from "react";
import styled from "styled-components";

const ContainerStyle = styled.div`
  padding: 1rem;
  margin: 0;
`;
export default class Container extends Component {
  render() {
    return <ContainerStyle>{this.props.children}</ContainerStyle>;
  }
}
