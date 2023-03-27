const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    minlength: [6, 'A  name must have more or equal then 6 characters'],
    maxlength: [40, 'A  name must have less or equal then 40 characters'],
  },
  userName: {
    type: String,
    required: [true, 'Please tell us your user name!'],
    unique: true,
    minlength: [6, 'A user name must have more or equal then 6 characters'],
    maxlength: [20, 'A user name must have less or equal then 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  interest: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
