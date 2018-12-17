import React from "react";
import { Link } from "react-router-dom";

export const NavGuestLinks = ({ isAuthenticated }) => (
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
