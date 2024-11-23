const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    Age: Number,
    password: String,
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model('user', userSchema);

module.exports = userModel;
