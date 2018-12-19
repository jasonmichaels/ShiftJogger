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

  componentWillReceiveProps = nextProps => {
    const { logs } = nextProps;
    if (!isEmpty(logs)) {
      const initialDiffs = logs.map(log => {
        /* 
           the following is initial logic to help fix 
           diffs when logs are from different days. 
           alternatively, and probably better, is to 
           conditionally render another date input for a 
           shift's end date upon a checkbox being ticked.
        */
        // const startTest =
        //   moment(new Date()) -
        //   moment(
        //     `${log.date.split("T")[0]}T${log.shiftStart}`,
        //     "YYYY-MM-DD HH:mm",
        //     "UTC"
        //   );
        // const endTest =
        //   moment(new Date()) -
        //   moment(
        //     `${log.date.split("T")[0]}T${log.shiftEnd}`,
        //     "YYYY-MM-DD HH:mm",
        //     "UTC"
        //   );
        // console.log(
        //   log.shiftStart,
        //   log.shiftEnd,
        //   moment(startTest).diff(endTest)
        // );
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
    }
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
