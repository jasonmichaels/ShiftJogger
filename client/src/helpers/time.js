import React from "react";
import moment from "moment";
import Moment from "react-moment";
import Typography from "@material-ui/core/Typography";

export const returnDate = date => {
  const removeIndex = date.indexOf("T");
  const newDate = date.slice(0, removeIndex);
  return newDate;
};

export const returnDateCard = (date, time, type) => {
  const timeDiff = new Date().getTimezoneOffset();
  let joined;
  let split = timeDiff.toString().split("");
  if (split.length < 4) {
    split.unshift("0");
    joined = split.join("");
  }
  const removeIndex = date.indexOf("T");
  const newDate = date
    .slice(0, removeIndex + 1)
    .concat(`${time}:00`)
    .concat(`.${joined}Z`);
  if (type === undefined) {
    return <Moment format="MM/DD/YYYY" date={newDate} />;
  } else {
    return newDate;
  }
};

export const getTime = time => {
  const t = moment(time, "HH:mm a");
  return t.format("HH:mm a");
};

export const getDiff = (startObj, endObj, card) => {
  const { startTime, startDay } = startObj;
  const { endTime, endDay } = endObj;

  const start = returnDateCard(startDay, startTime, null);
  const end = returnDateCard(endDay, endTime, null);

  const momentStart = moment(start, "YYYY-MM-DD HH:mm");
  const momentEnd = moment(end, "YYYY-MM-DD HH:mm");

  const duration = moment.duration(momentEnd.diff(momentStart));
  const hours = duration.asHours();
  if (card !== "card") {
    return hours;
  } else {
    return (
      <Typography className="pos" color="textSecondary">
        {hours === 1 ? (
          <span>{hours.toFixed(2)} hour</span>
        ) : (
          <span>{hours.toFixed(2)} hours</span>
        )}
      </Typography>
    );
  }
};
