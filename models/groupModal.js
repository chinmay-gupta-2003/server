const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [6, 'A  name must have more or equal then 6 characters'],
    maxlength: [40, 'A  name must have less or equal then 40 characters'],
    required: true,
  },
  adminName: {
    type: String,
    minlength: [6, 'A  name must have more or equal then 6 characters'],
    maxlength: [20, 'A  name must have less or equal then 20 characters'],
  },
  creator: {
    type: String,
    unique: true,
    required: [true, "Creator can't be null"],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  players: {
    type: [Object],
    max: 11,
  },
  invitationLink: String,
});

groupSchema.pre('save', function (next) {
  const randomString = crypto.randomBytes(32).toString('hex');

  this.invitationLink = crypto
    .createHash('sha256')
    .update(randomString)
    .digest('hex');

  next();
});

module.exports = mongoose.model('Groups', groupSchema);
