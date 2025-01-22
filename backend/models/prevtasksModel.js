const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskFeedbackSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  taskId: {
    type: String, // Task ID
    required: true,
  },
  feedback: {
    type: String, // User feedback for the task
    default: '', // Default to an empty string if no feedback is provided
  },
  completedAt: {
    type: Date, // Timestamp of task completion
    default: Date.now,
  },
}, { timestamps: true });

const prevTasks = mongoose.model('prevTasks', TaskFeedbackSchema);

module.exports = prevTasks;
