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

exports.getGroupAllMembers = async (req, res) => {
  try {
    const roomId = req.params.id;
    const group = await Group.findById(roomId);
    const userIds = group.players;
    const users = await User.find({ _id: { $in: userIds } });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    console.log(group);
    if (!group) {
      return res.status(404).json({
        status: 'fail',
        message: 'No group found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getSpecificGroup = async (req, res) => {
  try {
    const groups = await Group.find({ type: req.params.type });

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

exports.getGroupByInvitationLink = async (req, res) => {
  try {
    const group = await Group.find({
      invitationLink: req.params.invitationLink,
    });

    if (!group) {
      return res.status(404).json({
        status: 'fail',
        message: 'No group found with that link',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        group,
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
    const user = await User.find({ _id: req.params.id });

    if (!group.length || !user.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'No group or user found with that ID',
      });
    }

    if (group[0].players.includes(req.params.id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'User already in group',
      });
    }

    group[0].players.push(req.params.id);
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
