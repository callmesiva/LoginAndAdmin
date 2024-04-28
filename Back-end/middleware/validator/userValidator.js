const { checkSchema, validationResult } = require("express-validator");

const userSchema = checkSchema({
  name: {
    in: "body",
    notEmpty: true,
    errorMessage: "name must not be empty",
  },
  email: {
    in: "body",
    isEmail: true,
    errorMessage: "Invalid email address",
  },
  number: {
    in: "body",
    custom: {
      options: (value, { req }) => {
        if (!/^[6-9]\d{9}$/.test(value)) {
          throw new Error("Invalid phone number");
        }
        return true;
      },
    },
  },
  image: {
    in: "body",
    notEmpty: true,
    errorMessage: "image must not be empty",
  },
  password: {
    in: "body",
    notEmpty: true,
    errorMessage: "password must not be empty",
  },
});

module.exports = userSchema;
