const express = require('express');
const { createGroup } = require('../controllers/groupController');

const router = express.Router();

router.route('/').get().post(createGroup);

module.exports = router;
