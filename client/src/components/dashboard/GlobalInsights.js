import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class GlobalInsights extends Component {
  state = {
    times: [],
    hours: "",
    minutes: ""
  };

  componentWillReceiveProps = nextProps => {
    const { logs } = nextProps;
    const initialDiffs = logs.map(log => {
      const end = log.shiftEnd;
      const start = log.shiftStart;
      const diff = moment(end, "HH:mm").diff(moment(start, "HH:mm"));
      const duration = moment.duration(diff);
      const total =
        Math.floor(duration.asHours()) + moment.utc(diff).format(":mm");
      return total;
    });
    console.log(initialDiffs);
    const totalDiffs = initialDiffs.reduce((prev, cur) => {
      return moment.duration(cur).add(prev);
    }, 0);
    console.log(totalDiffs);
    this.setState({
      hours: totalDiffs._data.hours,
      minutes:
        totalDiffs._data.minutes < 10
          ? `0${totalDiffs._data.minutes}`
          : totalDiffs._data.minutes
    });
  };

  render() {
    const { hours, minutes } = this.state;
    return (
      <>
        <p>
          You have logged {hours} {hours === 1 ? "hour" : "hours"} and{" "}
          {minutes < 10 ? minutes.toString().replace("0", "") : minutes}{" "}
          {minutes === "01" ? "minute" : "minutes"} so far.
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
