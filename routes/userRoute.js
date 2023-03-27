const express = require('express');
const {
  createUser,
  getAllUsers,
  searchInterest,
} = require('../controllers/userController');
const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.route('/interests').get(searchInterest);

module.exports = router;
