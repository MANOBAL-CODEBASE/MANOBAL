const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
     type:String,
     required: true,
     unique:true
    },
    gender: String,
    isAssesmentDone:Boolean,
    age: Number,
    password: {
      type:String,
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model('user', userSchema);

module.exports = userModel;
