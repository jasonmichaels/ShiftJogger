const moment = require("moment");

const returnDate = (date, time) => {
  const momentString = moment(date).toISOString();
  const timeDiff = new Date().getTimezoneOffset();
  let joined;

  let split = timeDiff.toString().split("");
  if (split.length < 4) {
    split.unshift("0");
    joined = split.join("");
  }

  const removeIndex = momentString.indexOf("T");
  const newDate = momentString
    .slice(0, removeIndex + 1)
    .concat(`${time}:00`)
    .concat(`.${joined}Z`);
  return newDate;
};

module.exports = (startObj, endObj) => {
  const { startTime, startDay } = startObj;
  const { endTime, endDay } = endObj;

  const start = returnDate(startDay, startTime);
  const end = returnDate(endDay, endTime);

  const momentStart = moment(start, "YYYY-MM-DD HH:mm");
  const momentEnd = moment(end, "YYYY-MM-DD HH:mm");

  const duration = moment.duration(momentEnd.diff(momentStart));

  const hours = duration.asHours();

  return hours;
};
