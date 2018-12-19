const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateSendInput = data => {
  let errors = {};

  // since Validator's `isEmpty` only tests strings,
  // need to convert possibly an empty field to an empty string.
  // so, if not there at all, convert to empty string

  data.destEmail = !isEmpty(data.destEmail) ? data.destEmail : "";
  data.fromEmail = !isEmpty(data.fromEmail) ? data.fromEmail : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";

  if (!Validator.isEmail(data.destEmail)) {
    errors.destEmail = "Destination email is invalid";
  }

  if (Validator.isEmpty(data.destEmail)) {
    errors.destEmail = "Destination email field is required";
  }

  if (!Validator.isEmail(data.fromEmail)) {
    errors.fromEmail = "Your email is invalid";
  }

  if (Validator.isEmpty(data.fromEmail)) {
    errors.fromEmail = "The sender's email is a required field";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Subject line is a required field";
  }
  if (!Validator.isLength(data.subject, { min: 6, max: 20 })) {
    errors.subject = "Subject line must be between 6 and 20 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
