import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils/utils";
import { setCurrentUser, logoutUser } from "./reduxors/actions/authActions";
import { clearCurrentProfile } from "./reduxors/actions/authActions";
import { store } from "./store";

import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Private from "./components/common/Private";
import Log from "./components/Log";
import Drafts from "./pages/main-app/Drafts";
import Sent from "./pages/main-app/Sent";
import SendForm from "./components/send/SendForm";

import Landing from "./pages/landing/Landing";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import NotFound from "./pages/not-found/NotFound";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// check for token
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
    store.dispatch(clearCurrentProfile());
    // redirect
    window.location.href = "/auth/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div
            className="App"
            style={{
              width: "100vw",
              height: "100vh",
              position: "relative",
              padding: 0,
              margin: 0
            }}>
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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
