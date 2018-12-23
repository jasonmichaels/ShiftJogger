import React from "react";
import { Link } from "react-router-dom";
import { StyledNavButton } from "../componentStyles/navStyles";

export const NavAuthLinks = ({ name, handleLogoutClick, handleRedirect }) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item" style={{ marginRight: "3px" }}>
      <Link
        style={{ cursor: "pointer" }}
        className="nav-link"
        to="/logs/new"
        onClick={() => handleRedirect(null)}>
        New Log
      </Link>
    </li>
    <li className="nav-item" style={{ marginRight: "3px" }}>
      <Link className="nav-link" to="/drafts">
        Drafts
      </Link>
    </li>
    <li className="nav-item" style={{ marginRight: "3px" }}>
      <StyledNavButton
        className="nav-link"
        onClick={() => handleRedirect("sent")}>
        Sent
      </StyledNavButton>
    </li>
    <li className="nav-item">
      <StyledNavButton
        className="nav-link"
        bLeft="1px solid #fff"
        pRight="1rem"
        onClick={handleLogoutClick}>
        {name ? `Log out, ${name.split(" ")[0]}?` : "Log Out"}
      </StyledNavButton>
    </li>
  </ul>
);
