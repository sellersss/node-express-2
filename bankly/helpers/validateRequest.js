/**
 * Method to validate data using jsonschema.
 *
 * @param {Object} instance includes the body of the request
 * @param {Object} schema includes the json schema to validate the request
 * @returns {boolean} if request is valid, return true, else return false
 */
const ExpressError = require('./expressError');
const jsonschema = require('jsonschema');

const validateRequest = (instance, schema) => {
  const v = jsonschema.validate(instance, schema);

  if (!v.valid) {
    const eList = v.errors.map(error => error.stack);
    const e = new ExpressError(eList, 400);
    return e;
  }

  return v.valid;
};

module.exports = validateRequest;
