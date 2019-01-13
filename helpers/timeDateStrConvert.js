const moment = require("moment");

module.exports = (startDate, endDate) => {
  const offset = new Date().getTimezoneOffset();
  const newStartDate = moment
    .utc(startDate)
    .utcOffset(offset)
    .format("MM/DD/YYYY");
  const newEndDate =
    endDate !== ""
      ? moment
          .utc(endDate)
          .utcOffset(offset)
          .format("MM/DD/YYYY")
      : newStartDate;

  return {
    newStartDate,
    newEndDate
  };
};
