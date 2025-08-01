// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Add more routes later
// app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
