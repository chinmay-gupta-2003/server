const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

exports.register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      friends: [],
      password: hash,
      image: req.file.path,
      interest: [],
      location: {
        type: 'Point',
        coordinates: [req.body.latitude, req.body.longitude],
      },
    });
    await newUser.save();
    let token = '';
    if (newUser) {
      token = jwt.sign({ id: newUser._id }, process.env.JWT);
      console.log('Token');
      res.cookie('token', token);
    }
    res.status(200).json({
      user: newUser,
      message: 'User has been signed in!',
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ userName: req.body.userName });
    console.log(user);
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      res.status(400).json({
        status: 'fail',
        message: 'Password is incorrect',
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res.cookie('token', token);
    res.status(200).json({
      status: 'success',
      message: 'User has been logged in!',
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
