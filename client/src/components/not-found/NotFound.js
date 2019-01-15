import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../img/not-found.gif";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", height: "calc(100vh - 100px)" }}>
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
        src={notFound}
        alt="walking away"
        style={{ width: "400px", position: "fixed", bottom: "40px", left: 0 }}
      />
    </div>
  );
};

export default NotFound;
