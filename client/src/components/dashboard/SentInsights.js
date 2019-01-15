import React from "react";
import { Link } from "react-router-dom";

export const SentInsights = ({ sent }) => {
  return (
    <>
      <div>
        <p>You have {sent.length ? sent.length : 0} sent logs</p>
      </div>
      <Link to="/sent">
        <input
          type="button"
          value="View Sent Invoices!"
          className="btn btn-dark"
        />
      </Link>
    </>
  );
};
