import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const DraftsInsights = ({ unsent }) => {
  return (
    <>
      <div>
        <p>You have {unsent.length} unsent logs</p>
      </div>
      <Link to="/drafts">
        <input
          type="button"
          value="Send an invoice!"
          className="btn btn-dark"
        />
      </Link>
    </>
  );
};

DraftsInsights.propTypes = {
  unsent: PropTypes.any.isRequired
};
