import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils/utils";
import { setCurrentUser, logoutUser } from "./reduxors/actions/authActions";
import { clearCurrentProfile } from "./reduxors/actions/authActions";
import { store } from "./store";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";
import Private from "./components/common/Private";
import Log from "./pages/main-app/Log";
import Drafts from "./pages/main-app/Drafts";
import Sent from "./pages/main-app/Sent";

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
            style={{ width: "100vw", height: "100vh", position: "relative" }}>
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Landing} style={{}} />

              <Route exact path="/auth/register" component={Register} />
              <Route exact path="/auth/login" component={Login} />

              <Switch>
                <Private exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <Private exact path="/logs/:id" component={Log} />
              </Switch>
              <Switch>
                <Private exact path="/drafts" component={Drafts} />
              </Switch>
              <Switch>
                <Private exact path="/sent" component={Sent} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
