const jwt = require('jsonwebtoken');
const questionModel = require('../models/questionModel');
const scoreModel = require('../models/scoreModel');
const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const prevTaskModel = require('../models/prevtasksModel');
const userTasksModel = require('../models/userTasksModel')
const TaskModel = require('../models/tasksModel');

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

const posts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: 'posts fetched sucessfuly!',
      posts: posts,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const myposts = async (req, res) => {
  try {
    const posts = await postModel
      .find({ author: req.user.email })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: 'posts fetched sucessfuly!',
      posts: posts,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const createpost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const post = await postModel({
      title: req.body.title,
      content: req.body.content,
      author: req.user.email,
    });
    post.save();

    return res.status(200).send({
      success: true,
      message: 'Post created sucessfuly!',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deletepost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(400).send({
        success: false,
        message: 'This post is not registered!',
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Post deleted sucessfuly!',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getnexttask = async (req, res) => {
  try {
    const orderList = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    const userEmail = req.user.email;

    const existingPendingTask = await userTasksModel.findOne({ userEmail, status: 'pending' }).populate('taskId');

    if (existingPendingTask) {
      return res.status(200).send({
        success: true,
        message: 'You have an ongoing task!',
        task: existingPendingTask.taskId,
      });
    }

    const userScore = await scoreModel.findOne({ userEmail });
    if (!userScore) {
      return res.status(400).send({
        success: false,
        message: 'Score is not registered!',
      });
    }

    const scores = userScore.scores;
    const sumScore = Object.values(scores).reduce((acc, score) => acc + score, 0);

    let userLevel = '';
    if (sumScore >= 1 && sumScore <= 12) {
      userLevel = 'beginner';
    } else if (sumScore >= 13 && sumScore <= 18) {
      userLevel = 'intermediate';
    } else if (sumScore >= 19 && sumScore <= 20) {
      userLevel = 'advanced';
    }


    const choosenTrait = orderList[Math.floor(Math.random() * orderList.length)];


    const prevCompletedTasks = await userTasksModel.find({ userEmail, status: 'completed' }).distinct('taskId');


    const newTask = await TaskModel.findOne({
      _id: { $nin: prevCompletedTasks }, 
      level: userLevel,
      trait: choosenTrait, 
    });

    if (!newTask) {
      return res.status(404).send({
        success: false,
        message: 'No suitable task found for the user!',
      });
    }


    const assignedTask = new userTasksModel({ userEmail, taskId: newTask._id });
    await assignedTask.save();

    return res.status(200).send({
      success: true,
      message: 'Task successfully fetched!',
      task: newTask,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


const completeTask = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const task = await userTasksModel.findOne({ userEmail, status: 'pending' });

    if (!task) {
      return res.status(400).send({
        success: false,
        message: 'No pending task found for this user!',
      });
    }
    task.status = 'completed';
    await task.save();

    return res.status(200).send({
      success: true,
      message: 'Task marked as completed!',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  assessment,
  questions,
  user,
  score,
  posts,
  myposts,
  createpost,
  deletepost,
  getnexttask,
  completeTask,
};
