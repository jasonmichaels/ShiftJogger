import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import Head from "next/head";
import Layout from "../components/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Head>
          <title>Shift Logger</title>
          {/* <link rel="stylesheet" href="https://bootswatch.com/4/spacelab/bootstrap.min.css"></link> */}
        </Head>
        <Container>
          <Provider store={reduxStore}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Container>
      </>
    );
  }
}

export default withReduxStore(MyApp);
