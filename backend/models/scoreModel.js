const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    scores: {
      Openness: {
        type: Number,
        default: 0,
      },
      Conscientiousness: {
        type: Number,
        default: 0,
      },
      Extraversion: {
        type: Number,
        default: 0,
      },
      Agreeableness: {
        type: Number,
        default: 0,
      },
      Neuroticism: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const scoreModel = mongoose.model("score", scoreSchema);

module.exports = scoreModel;
