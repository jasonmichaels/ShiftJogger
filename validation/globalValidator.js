const Validator = require("validator");
const isEmpty = require("./is-empty");
const messages = require("./messages");

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

const emptyChecker = (key, value, type) => {
  if (!messages[type][key]) return;
  if (Validator.isEmpty(value)) {
    return messages[type][key].required;
  }
};

const lengthChecker = (key, value, type) => {
  if (!messages[type][key].invalid) return;
  if (!Validator.isLength(value, lengthParams[key])) {
    return messages[type][key].invalid;
  }
};

const emailChecker = (key, type) => {
  if (!Validator.isEmail(key)) {
    return messages[type][key].invalid;
  }
};

const equalChecker = (password, password2, type) => {
  if (!Validator.equals(password, password2)) {
    return messages[type].password2.invalid;
  }
};

module.exports = globalValidator = data => {
  const errors = {};
  const newData = {};
  const passwords = {};
  const { type, ...rest } = data;

  for (let key in rest) {
    newData[key] = !isEmpty(data[key]) ? data[key] : "";
  }

  for (let key in newData) {
    if (key.toLowerCase().includes("email")) {
      errors[key] = emailChecker(key, type);
    }
  }

  for (let key in newData) {
    if (type === "register") {
      if (key === "password" || key === "password2") {
        passwords[key] = newData[key];
      }
    }
  }

  if (passwords.password && passwords.password2) {
    errors["password2"] = equalChecker(
      passwords.password,
      passwords.password2,
      "register"
    );
  }

  for (let key in newData) {
    for (let elem in lengthParams) {
      if (key === elem) {
        errors[key] = lengthChecker(key, newData[key].toString(), type);
      }
    }
    errors[key] = emptyChecker(key, newData[key], type);
    if (
      errors[key] === undefined ||
      errors[key] === null ||
      errors[key] === ""
    ) {
      delete errors[key];
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
