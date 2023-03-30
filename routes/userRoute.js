const express = require('express');
const {
  createUser,
  getAllUsers,
  searchByInterest,
  searchByUserName,
  editProfile,
  addRemoveFriend,
  matchUserWithinRange,
} = require('../controllers/userController');
const router = express.Router();

router
  .route('/users-within/:distance/center/:latlng/unit/:unit')
  .get(matchUserWithinRange);
router.route('/').post(createUser).get(getAllUsers);
router.route('/interests').get(searchByInterest);
router.route('/editprofile/:id').put(editProfile);
router.route('/:username').get(searchByUserName);
router.patch('/:id/:friendId', addRemoveFriend);

module.exports = router;
