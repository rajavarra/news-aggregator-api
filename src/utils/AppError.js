class AppError extends Error {
  /** source: https://www.toptal.com/nodejs/node-js-error-handling */

  // eslint-disable-next-line space-before-function-paren
  constructor(message, httpStatusCode) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.httpStatusCode = httpStatusCode || 500;
    Error.captureStackTrace(this);
  }
}

module.exports = AppError;
