const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default:null }, // Use user ID or username
  likes: { type: Number, default: 0 }, // Track the number of likes
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;
