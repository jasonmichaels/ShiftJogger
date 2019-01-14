const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLoginInput = data => {
  // errors object used to supply information to login form
  // if fields don't meet basic requirements, messages displayed client-side
  // from fields object (if applicable) in React app
  let errors = {};

  // since Validator's `isEmpty` only tests strings,
  // need to convert possibly an empty field to an empty string.
  // so, if not there at all, convert to empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  Validator.isEmpty(data.email)
    ? (errors.email = "Email field is required")
    : !Validator.isEmail(data.email)
    ? (errors.email = "Email is invalid")
    : null;

  Validator.isEmpty(data.password)
    ? (errors.password = "Pasword field is required")
    : !Validator.isLength(data.password, { min: 6, max: 30 })
    ? (errors.password = "Pasword must be between 6 and 30 characters")
    : null;

  console.log(errors);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
