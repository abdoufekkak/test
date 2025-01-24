const httpStatus = require("http-status");
const BaseError = require("./base-error.js");

class BadRequestError extends BaseError {
  constructor(message) {
    super("Bad Request", httpStatus.BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
