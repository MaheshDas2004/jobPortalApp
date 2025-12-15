const { body, validationResult } = require("express-validator");

const validateSignup = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("mobile")
    .optional()
    .matches(/^\d{10}$/)
    .withMessage("Mobile number must be 10 digits"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

module.exports = validateSignup;
