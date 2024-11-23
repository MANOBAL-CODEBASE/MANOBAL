// Imports
const userModel = require('../models/userModel');
const bcyript = require('bcryptjs');

// Register API
const register = async (req, res) => {
  try {
    const { name, email, age, gender, password } = req.body;
    if (!name || !email || !age || !gender || !password) {
      return res.status(400).send({
        sucess: false,
        message: 'All fields must me filled',
      });
    }
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).send({
        sucess: false,
        message: 'This user is already Registered!!',
      });
    }

    const hashedPassword = await bcyript.hash(password, 10);

    const user = await userModel({
      name,
      email,
      age,
      gender,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).send({
      sucess: true,
      message: 'User has been registered sucessfully!!',
    });
  } catch (error) {
    return res.status(400).send({
      sucess: false,
      message: error,
    });
  }
};

// Login API
const login = (req, res) => {
  res.status(200).send({ message: req.url });
};

module.exports = { register, login };
