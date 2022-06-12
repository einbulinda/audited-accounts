const db = require("../db"),
  { hash } = require("bcryptjs"),
  { sign } = require("jsonwebtoken"),
  { SECRET } = require("../constants");

//   Get All Users

// Register a New User
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const mail = email.toLowerCase();

  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "INSERT INTO users (first_name,last_name,email,password) values($1,$2,$3,$4)",
      [firstName, lastName, mail, hashedPassword]
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
