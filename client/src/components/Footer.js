import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  position: fixed;
  bottom: 0;
  background-color: ${props =>
    props.isAuthenticated ? "black" : "transparent"};
  & * {
    margin: 0.25rem 0;
  }
`;

const Footer = ({ auth }) => {
  console.log(auth);
  return (
    <StyledFooter className="footer" isAuthenticated={auth.isAuthenticated}>
      <Link to={`https://github.com/chingu-voyage7/Geckos-Team-18`}>
        <p className="text-center text-white">GitHub</p>
      </Link>
      <Link to={auth.isAuthenticated ? "/drafts" : "/landing"}>
        <p className="text-white text-center">
          ShiftJogger &copy; {new Date().getFullYear()}
        </p>
      </Link>

      <Link to={`www.something.come/team`}>
        <p className="text-center text-white">Contributors</p>
      </Link>
    </StyledFooter>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Footer);
