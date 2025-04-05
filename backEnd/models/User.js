const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  picture: String,
  googleId: String, // from Google
  // You can also keep other fields like password, createdAt, etc.
});

module.exports = mongoose.model("User", userSchema);
