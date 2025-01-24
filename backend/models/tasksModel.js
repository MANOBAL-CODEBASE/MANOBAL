const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trait: {
      type: String,
      required: true,
      enum: [
        'openness',
        'conscientiousness',
        'extraversion',
        'agreeableness',
        'neuroticism',
      ], // Valid traits
    },
    level: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'], // Difficulty levels
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Task model
const Tasks = mongoose.model('tasks', TaskSchema);

module.exports = Tasks;
