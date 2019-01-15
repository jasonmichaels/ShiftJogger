import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// third-party imports
import { Provider } from "react-redux";
import styled from "styled-components";
// auth imports
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./helpers/utils";
// redux imports
import { setCurrentUser, logoutUser } from "./reduxors/actions/authActions";
import { store } from "./store";
// local component imports
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Private from "./components/common/Private";
import Log from "./components/Log";
import Drafts from "./components/main-app/Drafts";
import Sent from "./components/main-app/Sent";
import SendForm from "./components/send/SendForm";
import Landing from "./components/landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/not-found/NotFound";

// style imports
import "./App.css";

const StyledApp = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
  padding: 0;
  margin: 0;
  background-color: #ebeff3;
`;

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and expiry
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // log out user
    store.dispatch(logoutUser());
    // redirect
    window.location.href = "/auth/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <StyledApp>
            <>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/auth/register" component={Register} />
                <Route exact path="/auth/login" component={Login} />
                <Private exact path="/dashboard" component={Dashboard} />
                <Private key={1} exact path="/logs/:id" component={Log} />
                <Private exact path="/drafts" component={Drafts} />
                <Private exact path="/sent" component={Sent} />
                <Private exact path="/send/:id" component={SendForm} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </>
          </StyledApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
