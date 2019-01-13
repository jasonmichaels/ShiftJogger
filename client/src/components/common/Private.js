import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

/*
  Private HOC: @params: component, auth (from redux mapStateToProps), ...rest (passed to rendered component)
    - Additional jwt detection when traversing private routes, 
      redirecting user to /auth/login when token expiry is less than current time
    - Check occurs ever fifteen minutes
*/

const Private = ({ component: Component, auth, ...rest }) => {
  setInterval(() => {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        window.location.href = "/auth/login";
      }
    }
  }, 1000 * 60 * 15);

  const { location } = { ...rest };
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth/login", state: { from: location } }}
          />
        )
      }
    />
  );
};

Private.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps)(Private);
