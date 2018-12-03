import React, { Component } from "react";
import styled from "styled-components";

const ContainerStyle = styled.div`
  .drafts {
    margin: 0 auto;

    input {
      display: block;
      margin: 0 auto;
      width: 70%;
      padding: 0.25rem;
    }
    table {
      margin-top: 2rem;
      th {
        padding: 1rem;
      }
      td {
        padding: 1rem;
      }
    }
  }
`;
export default class Container extends Component {
  render() {
    return <ContainerStyle>{this.props.children}</ContainerStyle>;
  }
}
