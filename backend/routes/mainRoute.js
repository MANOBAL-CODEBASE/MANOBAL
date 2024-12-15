const express = require("express");
const mainRouter = express.Router();
const assesment = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

mainRouter.post('/assesment',authMiddleware, assesment);


module.exports = mainRouter;
