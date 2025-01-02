const jwt = require('jsonwebtoken');
const questionModel = require('../models/questionModel');
const scoreModel = require('../models/scoreModel');
const userModel = require('../models/userModel');

const assessment = async (req, res) => {
  try {
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

    for (const answer of answers) {
      const { id, _id, answer: score } = answer;

      if (score < 1 || score > 5) {
        return res.status(400).send({
          success: false,
          message: `Invalid score for question ID ${id}: must be between 1 and 5.`,
        });
      }

      const ques = await questionModel.findOne({ id });

      const trait = ques.trait;

      if (trait) {
        traits[trait].push(score);
      }
    }

    const result = {};
    for (const trait in traits) {
      const scores = traits[trait];

      let sum = 0;

      for (const score of scores) {
        sum += score;
      }

      const average = sum / scores.length;
      result[trait] = average.toFixed(2);
    }

    const userEmail = req.user.email;
    const scoreExist = await scoreModel.findOne({ userEmail });
    if (scoreExist) {
      await scoreModel.deleteOne({ userEmail });
    }
    const userScore = new scoreModel({ userEmail, scores: result });
    await userScore.save();
    await userModel.updateOne({ email: userEmail }, { isAssesmentDone: true });

    return res.status(200).send({
      success: true,
      message: 'Personality assessment completed successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const questions = async (req, res) => {
  try {
    const ques = await questionModel.find();
    const quesLen = ques.length;
    return res.status(200).send({
      success: true,
      message: 'Successful!',
      noOfQuestions: quesLen,
      questions: ques,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const user = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'This user is not registered!',
      });
    }
    return res.status(200).send({
      success: true,
      message: 'User fetched sucessfuly!',
      user: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const score = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userScore = await scoreModel.findOne({ userEmail });
    if (!userScore) {
      return res.status(400).send({
        success: false,
        message: 'Score is not calculated yet!',
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Score fetched sucessfuly!',
      score: userScore,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { assessment, questions, user, score };
