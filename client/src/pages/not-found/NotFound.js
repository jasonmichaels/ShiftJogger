import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1 className="display-4">Whoopsies! Page Not Found!</h1>
      <p>
        Sorry, either that page doesn't exist or we're having problems fetching
        it.
      </p>
      <p>You may've typed the URL incorrectly, too!</p>
    </div>
  );
};

export default NotFound;
