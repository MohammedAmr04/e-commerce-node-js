const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { createUser } = require("../services/user.service");
const generateToken = require("../utils/generateToken");
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const register = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must meet complexity requirements" });
    }
    await createUser({ userName, email, address, phone, password });
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // generate token
    const token = generateToken(user.id, user.role, user.email);
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { register, login };
