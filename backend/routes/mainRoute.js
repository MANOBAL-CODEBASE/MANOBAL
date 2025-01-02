const express = require("express");
const mainRouter = express.Router();
const {assessment,questions,user, score} = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

mainRouter.post('/assessment',authMiddleware, assessment);
mainRouter.get('/get-questions',questions);
mainRouter.get('/get-user',authMiddleware, user);
mainRouter.get('/get-score',authMiddleware, score);

module.exports = mainRouter;
