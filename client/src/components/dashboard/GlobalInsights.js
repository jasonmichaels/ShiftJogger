import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { isEmpty } from "../../helpers/isEmpty";

class GlobalInsights extends Component {
  state = {
    times: [],
    hours: "",
    minutes: ""
  };

  render() {
    const { hours, minutes } = this.state;
    console.log(hours, minutes);
    const actualHours =
      hours === "00" || hours === null || hours === undefined || hours === ""
        ? "zero hours"
        : hours === 1
        ? "one hour"
        : `${hours} hours`;
    const actualMinutes =
      minutes === "00" ||
      minutes === null ||
      minutes === undefined ||
      minutes === ""
        ? null
        : minutes === 1
        ? "and one minute"
        : `and ${minutes} minutes`;
    return (
      <>
        <p>
          You have logged {actualHours} {actualMinutes} so far!
        </p>
        <small>
          Note that ShiftJogger will soon add functionality to filter dates and
          to archive logs!
        </small>
      </>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.log.logs
});

export default connect(mapStateToProps)(GlobalInsights);
