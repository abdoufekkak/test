const httpStatus = require("http-status");
const BaseError = require("./base-error.js");

class ForbiddenError extends BaseError {
  constructor(message) {
    super("Forbidden Error", httpStatus.FORBIDDEN, message);
  }
}

module.exports = ForbiddenError;
