// Simple function to check whether login information and
// possibly submitted log data is empty --
// works with strings and objects, including arrays

const isEmpty = val =>
  val === undefined ||
  val === null ||
  (typeof val === "object" && Object.keys(val).length === 0) ||
  (typeof val === "string" && val.trim().length === 0);

module.exports = isEmpty;
