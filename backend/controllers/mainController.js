const jwt = require('jsonwebtoken');
const questionModel = require('../models/questionModel');

const assessment = async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).send({
      success: false,
      message: 'Invalid input: answers must be an array.',
    });
  }
  const traits = {
    Openness: [],
    Conscientiousness: [],
    Extraversion: [],
    Agreeableness: [],
    Neuroticism: [],
  };

  // Map answers to their respective traits
  answers.forEach(async (answer) => {
    const { id, _id, answer: score } = answer;

    if (score < 1 || score > 5) {
      return res.status(400).send({
        success: false,
        message: `Invalid score for question ID ${id}: must be between 1 and 5.`,
      });
    }

    const questions = await questionModel.find();

    console.log(questions);

    const trait = questionMapping[id];
    if (trait) {
      traits[trait].push(score);
    }
  });

  // Calculate average scores for each trait
  const result = {};
  for (const trait in traits) {
    const scores = traits[trait];
    const average =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    result[trait] = average.toFixed(2);
  }

  // Respond with personality analysis
  return res.status(200).send({
    success: true,
    message: 'Personality assessment completed successfully!',
    data: result,
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
module.exports = { assessment, questions };
