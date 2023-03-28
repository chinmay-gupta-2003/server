const express = require('express');
const {
  createUser,
  getAllUsers,
  searchByInterest,
  searchByUserName,
  editProfile,
  addRemoveFriend
} = require('../controllers/userController');
const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.route('/interests').get(searchByInterest);
router.route('/:username').get(searchByUserName);
router.route('/editprofile/:id').put(editProfile);

//friends
router.patch("/:id/:friendId", addRemoveFriend);

module.exports = router;
