const Validator = require("validator");
const isEmpty = require("./is-empty");
const messages = require("./messages");

const globalValidator = {
  data: {},
  type: "",
  errors: {},
  newData: {},
  passwords: {},
  lengthParams: {
    password: { min: 6, max: 30 },
    title: { min: 3, max: 50 },
    name: { min: 4, max: 30 },
    subject: { min: 4 }
  },
  validate: data => {
    console.log(data);
    const { type, ...rest } = data;

    globalValidator.data = rest;
    globalValidator.type = type;

    const allErrors = globalValidator.assignData();

    return {
      errors: allErrors,
      isValid: isEmpty(allErrors)
    };
  },
  assignData: () => {
    let {
      newData,
      data,
      errors,
      lengthSwitch,
      specialSwitch,
      requiredSwitch,
      checkErrors
    } = globalValidator;

    for (let key in data) {
      newData[key] = !isEmpty(data[key]) ? data[key] : "";
    }

    for (let key in newData) {
      lengthSwitch(key, newData[key]);
    }

    for (let key in newData) {
      specialSwitch(key, newData[key]);
    }

    for (let key in newData) {
      requiredSwitch(key, newData[key]);
    }

    for (let key in newData) {
      if (globalValidator.type !== "register") return;
      let { password, password2 } = globalValidator.newData;
      const { type } = globalValidator;

      key === "password"
        ? (password = newData[key])
        : key === "password2"
        ? (password2 = newData[key])
        : null;

      if (!Validator.equals(password, password2)) {
        errors["password2"] = messages[type][key].invalid;
      }
    }

    const newErrors = checkErrors();

    errors = {};

    return newErrors;
  },
  checkErrors: () => {
    const nullErrors = { ...globalValidator.errors };
    const { errors } = globalValidator;

    for (let key in nullErrors) {
      if (!nullErrors[key]) {
        delete nullErrors[key];
      }
      delete errors[key];
    }
    return nullErrors;
  },
  lengthSwitch: (key, value) => {
    const { type, errors, lengthParams } = globalValidator;

    switch (type) {
      case "register":
        switch (key) {
          case "name":
          case "password":
            !Validator.isLength(value, lengthParams[key])
              ? (errors[key] = messages[type][key].length)
              : null;
            break;
        }
        break;
      case "login":
        switch (key) {
          case "password":
            !Validator.isLength(value, lengthParams[key])
              ? (errors[key] = messages[type][key].length)
              : null;
        }
    }
  },
  requiredSwitch: (key, value) => {
    switch (globalValidator.type) {
      case "register":
        switch (key) {
          case "name":
          case "email":
          case "password":
          case "password2":
            if (Validator.isEmpty(globalValidator.newData[key])) {
              console.log(globalValidator.newData[key]);
              globalValidator.errors[key] =
                messages[globalValidator.type][key].required;
            }
            break;
        }
        break;
      case "login":
        switch (key) {
          case "email":
          case "password":
            if (!Validator.isEmpty(value)) return;
            else {
              globalValidator.errors[key] =
                messages[globalValidator.type][key].required;
            }
            break;
        }
        break;
    }
  },
  specialSwitch: (key, value) => {
    const { type, newData, errors } = globalValidator;
    const { password, password2 } = globalValidator.passwords;

    switch (globalValidator.type) {
      case "register":
        switch (key) {
          case "email":
            if (!Validator.isEmail(newData[key])) {
              errors[key] = messages[type][key].invalid;
            }
            break;
        }
        break;
      case "login":
        switch (key) {
          case "email":
            if (!Validator.isEmail(value)) {
              errors[key] = messages[type][key].invalid;
            }
        }
    }
  }
};

module.exports = globalValidator;
