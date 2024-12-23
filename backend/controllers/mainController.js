const jwt = require('jsonwebtoken');
const questionModel = require('../models/questionModel');

const assesment = (req, res) => {
  console.log(req);
  
  return res.status(200).send({
    sucess: true,
    message: 'sucessfully!!',
  });
};

const questions = async (req, res) => {
  try {
    const ques = await questionModel.find();
    const quesLen = ques.length;
    console.log(ques);
    return res.status(200).send({
      success: true,
      message: 'Successful!',
      noOfQuestions: quesLen,
      questions: ques,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};
module.exports = { assesment, questions };
