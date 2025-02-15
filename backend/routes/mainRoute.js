const express = require('express');
const mainRouter = express.Router();
const {
  assessment,
  questions,
  user,
  score,
  posts,
  myposts,
  createpost,
  deletepost,
  getnexttask,
  completeTask
} = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

mainRouter.post('/assessment', authMiddleware, assessment);
mainRouter.get('/get-questions', questions);
mainRouter.get('/get-user', authMiddleware, user);
mainRouter.get('/get-score', authMiddleware, score);
mainRouter.get('/fetch-posts', authMiddleware, posts);
mainRouter.get('/fetch-my-posts', authMiddleware, myposts);
mainRouter.post('/create-post', authMiddleware, createpost);
mainRouter.delete('/delete-post/:postId', authMiddleware, deletepost);
mainRouter.get('/get-next-task', authMiddleware, getnexttask);
mainRouter.get('/complete-task', authMiddleware, completeTask);

module.exports = mainRouter;
