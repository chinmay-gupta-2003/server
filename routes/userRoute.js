const express = require('express');
const {
  createUser,
  getAllUsers,
  searchByInterest,
  searchByUserName,
} = require('../controllers/userController');
const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.route('/interests').get(searchByInterest);
router.route('/:username').get(searchByUserName);

module.exports = router;
