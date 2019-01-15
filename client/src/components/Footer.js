import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: grid;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: ${props =>
    props.isAuthenticated ? "rgba(52, 58, 64, 0.9)" : "transparent"};
  & * {
    margin: auto 0;
  }
  &::before {
    display: block;
    padding: 20px;
    height: 60px;
    width: 100%;
  }
`;

const Footer = ({ isAuthenticated }) => {
  return (
    <StyledFooter className="footer bg-dark" isAuthenticated={isAuthenticated}>
      <a
        href="https://github.com/chingu-voyage7/Geckos-Team-18"
        rel="noopener noreferrer"
        target="_blank">
        <p className="text-center text-white">GitHub</p>
      </a>
      <Link to={isAuthenticated ? "/dashboard" : "/landing"}>
        <p className="text-white text-center">
          ShiftJogger &copy; {new Date().getFullYear()}
        </p>
      </Link>
      <a href="www.something.come/team" target="_blank">
        <p className="text-center text-white">Contributors</p>
      </a>
    </StyledFooter>
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(Footer);
