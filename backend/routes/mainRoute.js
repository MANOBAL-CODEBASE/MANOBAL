const express = require("express");
const mainRouter = express.Router();
const {assesment,questions} = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

mainRouter.post('/assesment',authMiddleware, assesment);
mainRouter.get('/get-questions',questions);

module.exports = mainRouter;
