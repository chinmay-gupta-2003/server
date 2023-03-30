const User = require('../models/userModel');

const filterInterest = (req) => {
  let typeArray, interestObject;

  if (req.query.type.includes(',')) {
    typeArray = req.query.type.split(',');
    interestObject = {
      $in: typeArray,
    };
  } else if (req.query.type.includes('$')) {
    typeArray = req.query.type.split('$');
    interestObject = {
      $all: typeArray,
    };
  } else interestObject = req.query.type;

  return interestObject;
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.searchByInterest = async (req, res, next) => {
  try {
    const users = await User.find({ interest: filterInterest(req) });

    if (!users.length) {
      res.status(200).json({
        message: 'No user found!',
      });
      return;
    }

    res.status(200).json({
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.searchByUserName = async (req, res, next) => {
  try {
    const { username } = req.params;
    console.log(username);

    const users = await User.find({ userName: username });

    if (!users.length) {
      res.status(200).json({
        message: 'No user found!',
      });
      return;
    }

    res.status(200).json({
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.matchUserWithinRange = async (req, res) => {
  try {
    const { distance, latlng, unit } = req.params;
    const [latitude, longitude] = latlng.split(',');
    const type = req.query.type;

    let radius;
    if (unit === 'mi') radius = distance / 3963.2;
    else if (unit === 'km') radius = distance / 6378.1;

    let queryObject = {
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius],
        },
      },
    };

    if (type)
      queryObject = Object.assign(
        { interest: filterInterest(req) },
        queryObject
      );
    const users = await User.find(queryObject);

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
