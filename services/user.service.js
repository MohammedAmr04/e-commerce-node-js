const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
}

module.exports = { createUser };
