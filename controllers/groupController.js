const Group = require('../models/groupModal');

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
