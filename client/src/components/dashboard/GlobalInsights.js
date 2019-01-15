import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLogs } from "../../reduxors/actions/logActions";

const GlobalInsights = ({ logs }) => {
  const unsentHours =
    logs.length !== 0
      ? logs
          .map(log => (!log.sent ? log.hours : null))
          .reduce((prev, curr) => prev + curr, 0)
      : 0;

  const sentHours =
    logs.length !== 0
      ? logs
          .map(log => (log.sent ? log.hours : null))
          .reduce((prev, curr) => prev + curr, 0)
      : 0;

  return (
    <>
      <p>You've logged {unsentHours.toFixed(2)} hours!</p>
      <p>And you've invoiced {sentHours.toFixed(2)} hours so far!</p>
      <small>
        ShiftJogger will soon add functionality to filter logs by date and to
        archive logs!
      </small>
    </>
  );
};

GlobalInsights.propTypes = {
  logs: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  const { logs } = state.log;
  return { logs };
};

export default connect(
  mapStateToProps,
  { getLogs }
)(GlobalInsights);
