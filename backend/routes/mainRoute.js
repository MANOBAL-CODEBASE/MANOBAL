const express = require("express");
const mainRouter = express.Router();
const {assessment,questions,user} = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

mainRouter.post('/assessment',authMiddleware, assessment);
mainRouter.get('/get-questions',questions);
mainRouter.get('/get-user',authMiddleware, user);

module.exports = mainRouter;
