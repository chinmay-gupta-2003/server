const express = require('express');
const {
  createGroup,
  getAllGroups,
  addUserToGroup,
  getSpecificGroup,
  getGroupById,
  getGroupAllMembers,
  getGroupByInvitationLink,
  playMatch,
} = require('../controllers/groupController');
const upload = require('../utils/multerConfig');

const router = express.Router();

// router.route('/').get(getAllGroups).post(upload.single('image'), createGroup);
router.post('/', upload.single('image'), createGroup);
router.route('/:type').get(getSpecificGroup);
router.route('/getallgroupmembers/:id').get(getGroupAllMembers);
router.route('/user/:id/:invitationLink').patch(addUserToGroup);
router.route('/getgroup/:invitationLink').get(getGroupByInvitationLink);
router.route('/group/:id').get(getGroupById);
router.route('/changestatustoopen/:id').post(playMatch);

module.exports = router;
