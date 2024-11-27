// Imports
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    const hashedPassword = await bcrypt.hash(password, 10);

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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if fields are filled
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'All fields must be filled',
      });
    }

    // Find user by email
    const isUserExist = await userModel.findOne({ email });

    if (!isUserExist) {
      return res.status(400).send({
        success: false,
        message: 'This user is not registered!',
      });
    }

    // Check if password matches

    const isUserMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isUserMatched) {
      return res.status(400).send({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: isUserExist._id, email: isUserExist.email },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: '1h' } // Token expiry time
    );

    return res.status(200).send({
      success: true,
      message: 'Login successful!',
      token, // Send the token to the client
      user: {
        id: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
      }, // Optional user data
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Something went wrong',
    });
  }
};

module.exports = { register, login };
