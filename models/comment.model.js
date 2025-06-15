const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true }, // hoặc order
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
