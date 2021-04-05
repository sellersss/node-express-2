/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const { authUser, requireLogin, requireAdmin } = require('../middleware/auth');
const createTokenForUser = require('../helpers/createToken');
const validateRequest = require('../helpers/validateRequest');
const userRegisterSchema = require('../schema/userRegisterSchema.json');
const userAuthSchema = require('../schema/userAuthSchema.json');

/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/register', async (req, res, next) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      phone,
      admin // FIXES BUG #5
    } = req.body;

    // FIXES BUG #1
    const validation = validateRequest(req.body, userRegisterSchema);

    if (validation instanceof Error) {
      return next(validation);
    }

    let user = await User.register({
      username,
      password,
      first_name,
      last_name,
      email,
      phone,
      admin // FIXES BUG #5
    });
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // // FIXES BUG #1
    // const validation = validateRequest(req.body, userAuthSchema);

    // if (validation instanceof Error) {
    //   return next(validation);
    // }

    let user = User.authenticate(username, password);
    const token = createTokenForUser(username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
