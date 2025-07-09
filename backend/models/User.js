// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "health_worker", "resident"],
    default: "resident"
  }
});

module.exports = mongoose.model("User", userSchema);
