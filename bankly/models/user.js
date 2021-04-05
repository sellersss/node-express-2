const bcrypt = require('bcrypt');
const db = require('../db');
const ExpressError = require('../helpers/expressError');
const sqlForPartialUpdate = require('../helpers/partialUpdate');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
  /** Register user with data. Returns new user data. */

  static async register({
    username,
    password,
    first_name,
    last_name,
    email,
    phone,
    admin // FIXES BUG #5
  }) {
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users 
        WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(
        `There already exists a user with username '${username}'`,
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // FIXES BUG #5
    const result = await db.query(
      `INSERT INTO users 
          (username, password, first_name, last_name, email, phone, admin) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING username, password, first_name, last_name, email, phone, admin`,
      [username, hashedPassword, first_name, last_name, email, phone, admin]
    );

    // FIXES BUG #9
    delete result.password;
    return result.rows[0];
  }

  /** Is this username + password combo correct?
   *
   * Return all user data if true, throws error if invalid
   *
   * */

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
                password,
                first_name,
                last_name,
                email,
                phone,
                admin
            FROM users 
            WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      // FIXES BUG #9
      delete user.password;
      return user;
    } else {
      throw new ExpressError('Cannot authenticate', 401);
    }
  }

  /** Returns list of user info:
   *
   * [{username, first_name, last_name, email, phone}, ...]
   *
   * */

  // FIXES BUG #7
  // static async getAll(username, password) {
  // fixes unused parameters
  static async getAll() {
    const result = await db.query(
      `SELECT username,
                first_name,
                last_name,
                email,
                phone,
                admin
            FROM users 
            ORDER BY username`
    );
    return result.rows;
  }

  /** Returns user info: {username, first_name, last_name, email, phone}
   *
   * If user cannot be found, should raise a 404.
   *
   **/
  static async get(username) {
    // FIXES BUG #5
    const result = await db.query(
      `SELECT username,
                first_name,
                last_name,
                email,
                phone,
                admin
         FROM users
         WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      // FIXES BUG #8
      throw new ExpressError('No such user', 404);
    }

    return user;
  }

  /** Selectively updates user from given data
   *
   * Returns all data about user.
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async update(username, data) {
    // FIXES BUG #5
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let { query, values } = sqlForPartialUpdate(
      'users',
      data,
      'username',
      username
    );

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404);
    }
    // FIXES BUG #9
    delete user.password;
    return user;
  }

  /** Delete user. Returns true.
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async delete(username) {
    const result = await db.query(
      'DELETE FROM users WHERE username = $1 RETURNING username',
      [username]
    );
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404);
    }

    return true;
  }
}

module.exports = User;
