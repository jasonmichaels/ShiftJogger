import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div
      className="row"
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        right: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%"
      }}>
      <footer
        className="footer"
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "1fr 1fr 1fr"
        }}>
        <Link
          to={`https://github.com/chingu-voyage7/Geckos-Team-18`}
          style={{ margin: "0 auto" }}>
          <p className="text-center text-white">GitHub</p>
        </Link>
        <p className="text-white text-center">
          ShiftJogger &copy; {new Date().getFullYear()}
        </p>
        <Link to={`www.something.come/team`} style={{ margin: "0 auto" }}>
          <p className="text-center text-white">Contributors</p>
        </Link>
      </footer>
    </div>
  );
};
