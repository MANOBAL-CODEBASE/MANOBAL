const express = require("express");
const mainRouter = express.Router();
const {assessment,questions} = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

mainRouter.post('/assessment',authMiddleware, assessment);
mainRouter.get('/get-questions',questions);

module.exports = mainRouter;
