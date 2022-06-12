const db = require("../db"),
  { hash } = require("bcryptjs"),
  { sign } = require("jsonwebtoken"),
  { SECRET } = require("../constants");

//   Get All Users

// Register a New User
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "INSERT INTO users (firstName,lastName,email,password) values($1,$2,$3,$4)",
      [firstName, lastName, email, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "User account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login a User

// Protected Routes Access

// Logout User
