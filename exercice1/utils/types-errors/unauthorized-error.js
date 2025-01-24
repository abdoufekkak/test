const httpStatus = require("http-status");
const BaseError = require("./base-error.js");

class UnauthorizedError extends BaseError {
  constructor(message) {
    super("Unauthorized Error", httpStatus.UNAUTHORIZED, message);
  }
}

module.exports = UnauthorizedError;
