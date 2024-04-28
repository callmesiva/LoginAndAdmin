const { validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      await validation.run(req);
    }

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    return res
      .status(400)
      .json({ status: "Failed", msg: result?.array()[0]?.msg });
  };
};

module.exports = validate;
