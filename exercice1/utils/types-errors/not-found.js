// not-found-error.js
const httpStatus = require("http-status");
const BaseError = require("./base-error.js");

class NotFoundError extends BaseError {
  constructor(message) {
    console.log( httpStatus.NOT_FOUND)
    super("NotFoundError", httpStatus.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
