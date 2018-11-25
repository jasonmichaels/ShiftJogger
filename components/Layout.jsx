import React, { Component } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
  }
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
    const { children } = this.props;
    return (
      <div>
        <GlobalStyle />
        <Head>
          <title>Shift Logger</title>
          {/* <link rel="stylesheet" href="https://bootswatch.com/4/spacelab/bootstrap.min.css"></link> */}
        </Head>
        <Header toggleNav={this.toggleNav} headTitle={children.props} />
        <Navbar isOpen={this.state.isOpen} toggleNav={this.toggleNav} />
      </div>
    );
  }
}
