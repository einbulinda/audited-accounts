const { check } = require("express-validator"),
  db = require("../db"),
  { compare } = require("bcryptjs");

// Password
const password = check("password")
  .isLength({ min: 8, max: 15 })
  .withMessage("Password must be between 6 and 15 characters");

// Email
const email = check("email")
  .isEmail()
  .withMessage("Please enter a valid email");

//Check if email exists
const emailExists = check("email").custom(async (value) => {
  const rows = db.query("SELECT * FROM users WHERE email =$1", [value]);

  if (rows.length) {
    throw new Error("Email already exists");
  }
});

// Login Validation
const loginFields = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * FROM users WHERE email = $1", [value]);

  if (!user.rows.length) {
    throw new Error("User with that email does not exist");
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFields],
};
