const express = require('express');
const {
  createGroup,
  getAllGroups,
  addUserToGroup,
  getSpecificGroup,
} = require('../controllers/groupController');

const router = express.Router();

router.route('/').get(getAllGroups).post(createGroup);
router.route('/:type').get(getSpecificGroup);
router.route('/user/:email/:invitationLink').patch(addUserToGroup);
module.exports = router;
