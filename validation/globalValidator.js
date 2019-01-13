const Validator = require("validator");
const isEmpty = require("./is-empty");

/* 
@TODO: Implement key field conversion for log/add, log/edit, and send, so 
emailFrom, shiftStart, etc. errors are sent back with appropriate names rather than camelcase names. Then update server's users.js route to 
utilize the globalValidator rather than separate validator files. 
*/
const lengthParams = {
  password: { min: 6, max: 30 },
  title: { min: 3, max: 50 },
  name: { min: 2, max: 30 },
  subject: { min: 4 }
};

const lengthMessage = field => {
  const min = lengthParams[field].min;
  const max = lengthParams[field].max;
  return `${field.charAt(0).toUpperCase() + field.slice(1)} must be ${
    min && max ? `between ${min} and ${max}` : `at least ${min}`
  } characters`;
};

const emptyChecker = (key, value) => {
  if (Validator.isEmpty(value)) {
    return `${key.charAt(0).toUpperCase() + key.slice(1)} is a required field`;
  }
};

const lengthChecker = (key, value) => {
  if (!Validator.isLength(value, lengthParams[key])) {
    return lengthMessage(key);
  }
};

const emailChecker = property => {
  if (!Validator.isEmail(property)) {
    return `Email format is invalid`;
  }
};

const equalChecker = (password, password2) => {
  if (!Validator.equals(password, password2)) {
    return `Passwords must match!`;
  }
};

module.exports = globalValidator = data => {
  const errors = {};
  const newData = {};

  for (let key in data) {
    newData[key] = !isEmpty(data[key]) ? data[key] : "";
  }

  for (let key in newData) {
    if (key.toLowerCase().includes("email")) {
      errors[key] = emailChecker(newData[key]);
    }
  }

  for (let key in newData) {
    for (let elem in lengthParams) {
      if (key === elem) {
        errors[key] = lengthChecker(key, newData[key].toString());
      }
    }
    errors[key] = emptyChecker(key, newData[key]);
    if (errors[key] === undefined) {
      delete errors[key];
    }
  }

  for (let key in newData) {
    let password, password2;
    if (key !== "password" || key !== "password2") {
      null;
    } else {
      if (key.toString() === "password") {
        password = newData[key];
      }
      if (key.toString() === "password2") {
        password2 = newData[key];
      }
      errors["password2"] = equalChecker(password, password2);
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
