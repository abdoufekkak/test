const NotFoundError = require("../utils/types-errors/not-found.js");

const notFoundErrorMiddleware = (req, res, next) => {
  next(
    new NotFoundError(
      "Ooh you are lost, read the API documentation to find your way back home 😂"
    )
  );
};

module.exports = notFoundErrorMiddleware;
