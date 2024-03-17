const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  body: {
    type: String,
    required: [true, "body is required"],
  },
});
module.exports = mongoose.model("Post", postSchema);
