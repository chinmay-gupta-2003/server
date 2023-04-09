const express = require('express');
const {
  createGroup,
  getAllGroups,
  addUserToGroup,
  getSpecificGroup,
  getGroupById,
  getGroupAllMembers,
  getGroupByInvitationLink,
} = require('../controllers/groupController');

const router = express.Router();

router.route('/').get(getAllGroups).post(createGroup);
router.route('/:type').get(getSpecificGroup);
router.route('/getallgroupmembers/:id').get(getGroupAllMembers);
router.route('/user/:id/:invitationLink').patch(addUserToGroup);
router.route('/group/:invitationLink').get(getGroupByInvitationLink);
router.route('/group/:id').get(getGroupById);
module.exports = router;
