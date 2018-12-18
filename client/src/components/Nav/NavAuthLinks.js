import React from "react";
import { Link } from "react-router-dom";

export const NavAuthLinks = ({ name, handleLogoutClick }) => (
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
          cursor: "pointer",
          marginLeft: "1rem",
          borderLeft: "1px solid #fff",
          paddingLeft: "1rem"
        }}
        className="nav-link"
        onClick={handleLogoutClick}>
        {name ? `Log out, ${name.split(" ")[0]}?` : "Log Out"}
      </button>
    </li>
  </ul>
);
