import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  logoutUser,
  clearCurrentProfile
} from "../reduxors/actions/authActions";

class Navbar extends Component {
  handleLogoutClick = e => {
    console.log("logging out");
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    window.location.href = "/auth/login";
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" style={{ marginRight: "3px" }}>
          <Link className="nav-link" to="/logs/new">
            New Log
          </Link>
        </li>
        <li className="nav-item" style={{ marginRight: "3px" }}>
          <Link className="nav-link" to="/drafts">
            Drafts
          </Link>
        </li>
        <li className="nav-item" style={{ marginRight: "3px" }}>
          <Link className="nav-link" to="/sent">
            Sent
          </Link>
        </li>
        <li className="nav-item">
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer"
            }}
            className="nav-link"
            onClick={this.handleLogoutClick}>
            {user.name ? `Log out, ${user.name.split(" ")[0]}?` : "Log Out"}
          </button>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/auth/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/auth/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 navbar-fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
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
            {isAuthenticated ? authLinks : guestLinks}
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
