const User = require('../models/userModel');

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

exports.editProfile = async (req,res)=>{
  try{
    
  }
  catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

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
    const type = req.query.type;
    const users = await User.find({ interest: type });

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

// Friends

exports.addRemoveFriend = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;
    let frnd=true;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
      frnd=false;
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
      frnd=true
    }
    await user.save();
    await friend.save();
    const msgg=frnd?"Friends added successfully":"Friends Removed Succesfully"

    res.status(200).json(
      {msgg}
    );

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
