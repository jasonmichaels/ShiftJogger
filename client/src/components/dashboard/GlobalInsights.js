import React from "react";
import { isEmpty } from "../../helpers/isEmpty";
import * as time from "../../helpers/time";

const GlobalInsights = ({ logs }) => {
  const diffs = logs.map(log => {
    return time.getDiff(
      { startTime: log.shiftStart, startDay: log.dateStart },
      {
        endTime: log.shiftEnd,
        endDay: log.dateEnd !== null ? log.dateEnd : log.dateStart
      }
    );
  });
  const totalHours = diffs.reduce((prev, curr, i) => {
    return prev + curr;
  }, 0);

  return (
    <>
      {totalHours === 0.0 ? (
        "You haven't logged any hours yet!"
      ) : (
        <p>You have logged {totalHours.toFixed(2)} so far!</p>
      )}
      <small>
        Note that ShiftJogger will soon add functionality to filter dates and to
        archive logs!
      </small>
    </>
  );
};

export default GlobalInsights;
