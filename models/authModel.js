const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});
module.exports = mongoose.model("Auth", authSchema);
