const httpStatus = require("http-status");
const BaseError = require("./base-error.js");

class ConflictError extends BaseError {
  constructor(message) {
    super("Conflict Error", httpStatus.CONFLICT, message);
  }
}

module.exports = ConflictError;
