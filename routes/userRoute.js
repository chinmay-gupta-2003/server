const express = require('express');
const {
  createUser,
  getAllUsers,
  searchByInterest,
  searchByUserName,
  editProfile,
  addRemoveFriend,
  matchUserWithinRange,
  getUser,
  setLocation,
  getUserFriends,
} = require('../controllers/userController');
const router = express.Router();

router
  .route('/users-within/:distance/center/:latlng/unit/:unit')
  .get(matchUserWithinRange);
router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUser);
router.route('/interests').get(searchByInterest);
router.route('/setlocation/:id').patch(setLocation);
router.route('/editprofile/:id').patch(editProfile);
router.route('/:username').get(searchByUserName);
router.patch('/:id/:friendId', addRemoveFriend);
router.get('/getuserfriends/:id', getUserFriends);

module.exports = router;
