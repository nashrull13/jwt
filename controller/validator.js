const { check, validationResult } = require("express-validator");
const asyncMiddleware = require("express-async-handler");

const bookValidationRules = () => {
  return [
    check("title")
      .notEmpty()
      .withMessage("title is empty"),
    check("author")
      .notEmpty()
      .withMessage("author is empty"),
    check("published_date"),
    check("pages")
      .notEmpty()
      .withMessage("pages is empty"),
    check("language")
      .notEmpty()
      .withMessage("language is empty"),
    check("published_id")
      .notEmpty()
      .withMessage("published_id is empty")
  ];
};

const userValidationRules = () => {
  return [
    check("name")
      .notEmpty()
      .isString()
      .withMessage("Name is empty"),
    check("username")
      .notEmpty()
      .isString()
      .withMessage("Username is empty"),
    check("email")
      .notEmpty()
      .isEmail(),
    check("password")
      .isLength({ min: 6 })
      .notEmpty()
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  bookValidationRules,
  userValidationRules,
  validate
};
