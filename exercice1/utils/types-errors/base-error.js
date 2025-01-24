const httpStatus = require("http-status");

class BaseError extends Error {
  constructor(name, httpCode, message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
console.log(name)
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = true;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
