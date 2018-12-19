const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLogInput = data => {
  let errors = {};

  // since Validator's `isEmpty` only tests strings,
  // need to convert possibly an empty field to an empty string.
  // so, if not there at all, convert to empty string

  data.title = !isEmpty(data.title) ? data.title : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  Validator.isEmpty(data.title)
    ? (errors.title = "Title is a required field")
    : !Validator.isLength(data.title, { min: 6, max: 100 })
    ? (errors.title = "Log titles must be between 10 and 30 characters")
    : null;

  Validator.isEmpty(data.date)
    ? (errors.date = "Log date is a required field.")
    : null;

  Validator.isEmpty(data.shiftStart)
    ? (errors.shiftStart = "Log start time is a required field.")
    : null;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
