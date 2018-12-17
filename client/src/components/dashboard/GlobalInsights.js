import React from "react";
import Moment from "react-moment";
import moment from "moment";

export const GlobalInsights = ({ user, logs }) => {
  const times = [];
  logs.forEach((log, i) => {
    const toAppend = {};
    const hours = log.shiftStart.split(":")[0];
    const minutes = log.shiftStart.split(":")[1];
    const seconds = log.shiftStart.split(":")[2];
    toAppend.hours = hours;
    toAppend.minutes = minutes;
    toAppend.seconds = seconds;
    times.push(toAppend);
  });
  console.log(times);
  const totalTime = times.reduce(
    (prev, cur) => moment.duration(cur).add(prev),
    moment.duration(times[0])
  );
  console.log(totalTime);
  return (
    <>
      <p>
        You have logged {totalTime._data.days} days, {totalTime._data.hours}{" "}
        hours, and {totalTime._data.minutes} minutes so far.
      </p>
      <small>
        Note that ShiftJogger will soon add functionality to filter dates and to
        archive logs!
      </small>
    </>
  );
};
