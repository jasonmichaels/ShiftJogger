import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import styled, { createGlobalStyle } from "styled-components";
import Container from "./Container";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 15vw auto;
  grid-template-rows: auto;
`;

export default class Layout extends Component {
  state = {
    isOpen: true
  };
  toggleNav = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <>
        <GlobalStyle />
        <Grid>
          <div>
            <Header toggleNav={this.toggleNav} />
            <Navbar isOpen={this.state.isOpen} toggleNav={this.toggleNav} />
          </div>
          <Container>{this.props.children}</Container>
        </Grid>
      </>
    );
  }
}
