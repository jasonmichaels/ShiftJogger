export const createRandomString = strLen => {
  strLen = typeof strLen == "number" && strLen > 0 ? strLen : false;

  if (strLen) {
    // define possible characters
    const possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789";

    // start final string
    let str = "";
    for (let i = 0; i < strLen; i++) {
      // get random char from possibleChars string
      str += possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    return str;
  } else {
    return false;
  }
};
