const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Register a new user
router.post("/register", authController.register);

// Login an existing user
router.post("/login", authController.login);

module.exports = router;
