import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="display-4 mt-4">Whoopsies! Page Not Found!</h1>
      <p>
        Sorry, either that page doesn't exist or we're having problems fetching
        it.
      </p>
      <p>You may've typed the URL incorrectly, too!</p>
      <Link
        to="/"
        className="btn btn-secondary mx-4 my-4"
        style={{ width: "120px", margin: "0 auto" }}>
        Go Back
      </Link>
      <img
        src="https://media.giphy.com/media/Gzvo3F4TBUm1W/giphy.gif"
        alt="walking away"
        style={{ width: "400px", position: "fixed", bottom: 0, left: 0 }}
      />
    </div>
  );
};

export default NotFound;
