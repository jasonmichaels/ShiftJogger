const Validator = require("validator");
const isEmpty = require("./is-empty");

// takes a data object
module.exports = validateRegisterInput = data => {
  // same as in login, registration fields (all field validation logic is placeholder -- i.e., basic -- for now)
  let errors = {};

  // since Validator's `isEmpty` only tests strings,
  // need to convert possibly an empty field to an empty string.
  // so, if not there at all, convert to empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Pasword field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Pasword must be between 6 and 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  // returns errors, whether empty or populated based on above logic
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
