const { check } = require("express-validator");
const { isEmpty } = require("./is-empty.js");

module.exports = data => {
  const { type, ...rest } = data;
};
