// TESTS BUG #

const createToken = require('../helpers/createToken');

describe('createToken', () => {
  it('prevents token generation if username is falsy', () => {
    const username = undefined;
    const _token = createToken(username, (admin = false));

    expect(_token).toBe(null);
  });
});
