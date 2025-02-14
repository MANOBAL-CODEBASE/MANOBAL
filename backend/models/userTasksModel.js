const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTaskSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks', // Reference to Tasks collection
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const UserTasks = mongoose.model('user_tasks', UserTaskSchema);
module.exports = UserTasks;
