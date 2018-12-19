import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  logoutUser,
  clearCurrentProfile
} from "../../reduxors/actions/authActions";
import { NavGuestLinks } from "./NavGuestLinks";
import { NavAuthLinks } from "./NavAuthLinks";

class Navbar extends Component {
  handleLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    window.location.href = "/auth/login";
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark navbar-fixed-top">
        <div className="container">
          <Link
            className="navbar-brand"
            to={isAuthenticated ? "/dashboard" : "/"}>
            ShiftJogger
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
