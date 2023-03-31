const Group = require('../models/groupModal');
const User = require('../models/userModel');

exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();

    res.status(200).json({
      status: 'success',
      results: groups.length,
      data: {
        groups,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.addUserToGroup = async (req, res) => {
  try {
    const group = await Group.find({
      invitationLink: req.params.invitationLink,
    });
    const user = await User.find({ email: req.params.email });

    if (!group.length || !user.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'No group or user found with that ID',
      });
    }

    group[0].players.push(user[0]);
    await group[0].save();

    res.status(201).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
