const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty() === true) {
    next();
  } else {
    res.send({ errors: result.array() });
  }
};
