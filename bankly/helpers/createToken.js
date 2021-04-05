const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT for payload {username, admin}. */

function createToken(username, admin = false) {
  // FIXES BUG #10
  // let payload = { username, admin };
  // return jwt.sign(payload, SECRET_KEY);

  if (username) {
    let payload = { username, admin };
    return jwt.sign(payload, SECRET_KEY);
  } else {
    return null;
  }
}

module.exports = createToken;
