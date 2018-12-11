const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLogInput = data => {
  let errors = {};

  // since Validator's `isEmpty` only tests strings,
  // need to convert possibly an empty field to an empty string.
  // so, if not there at all, convert to empty string

  data.title = !isEmpty(data.title) ? data.title : "";

  Validator.isEmpty(data.text)
    ? (errors.text = "Title is a required field")
    : !Validator.isLength(data.text, { min: 10, max: 30 })
    ? (errors.title = "Log titles must be between 10 and 30 characters")
    : null;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
