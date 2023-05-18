const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinaryConfig');

dotenv.config();

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ userName: req.body.userName }, { email: req.body.email }],
    });

    if (existingUser) {
      return res.status(409).json({
        status: 'fail',
        message: 'User with the same username or email already exists',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const newUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        friends: [],
        password: hash,
        image: image.secure_url,
        cloudinary_id: image.public_id,
        interest: [],
        location: {
          type: 'Point',
          coordinates: [req.body.latitude, req.body.longitude],
        },
      });
      await newUser.save();
    // } catch (uploadError) {
    //   // Handle image upload error
    //   return res.status(500).json({
    //     status: 'error',
    //     message: 'Error occurred while uploading the image',
    //   });
    // }

    let token = '';
    if (newUser) {
      token = jwt.sign({ id: newUser._id }, process.env.JWT);
      res.cookie('token', token);
    }
    res.status(200).json({
      status: 'success',
      user: newUser,
      message: 'User has been signed in!',
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({ userName: req.body.userName });
//     console.log(user);
//     if (!user) {
//       res.status(404).json({
//         status: 'fail',
//         message: 'User not found',
//       });
//     }

//     const isPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!isPassword) {
//       res.status(400).json({
//         status: 'fail',
//         message: 'Password is incorrect',
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT
//     );
//     const { password, isAdmin, ...otherDetails } = user._doc;

//     res.cookie('token', token);
//     res.status(200).json({
//       status: 'success',
//       message: 'User has been logged in!',
//       user: user,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
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
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
