import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../reduxors/actions/authActions";
import { goBack } from "../../reduxors/actions/logActions";
import { NavGuestLinks } from "./NavGuestLinks";
import { NavAuthLinks } from "./NavAuthLinks";

class Navbar extends Component {
  handleLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "/auth/login";
  };
  handleRedirect = path => {
    const { history, goBack } = this.props;
    goBack(path, history);
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-dark navbar-fixed-top"
        style={{ height: "60px" }}>
        <div className="container">
          <Link
            className="navbar-brand"
            to={isAuthenticated ? "/dashboard" : "/"}>
            {isAuthenticated ? "Dashboard" : "ShiftJogger"}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <NavAuthLinks
                name={user.name}
                handleRedirect={this.handleRedirect}
                handleLogoutClick={this.handleLogoutClick}
              />
            ) : (
              <NavGuestLinks isAuthenticated={isAuthenticated} />
            )}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

export default connect(
  mapStateToProps,
  { logoutUser, goBack }
)(withRouter(Navbar));
