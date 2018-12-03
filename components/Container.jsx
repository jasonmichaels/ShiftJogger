import React, { Component } from "react";
import styled from "styled-components";

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  .drafts {
    margin: 0 auto;

    input {
      width: 100%;
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
