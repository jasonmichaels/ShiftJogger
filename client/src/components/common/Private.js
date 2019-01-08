import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Private = ({ component: Component, auth, ...rest }) => {
  console.log(auth);
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
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
