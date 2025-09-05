// utils/generateToken.js

const jwt = require("jsonwebtoken");

const generateToken = (userId, role, email) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  return jwt.sign({ id: userId, email, role }, secretKey, { expiresIn });
};

module.exports = generateToken;
