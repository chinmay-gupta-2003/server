const express = require('express');
const router = express.Router();
const {
    addItem,
} = require('../controllers/itemController');
const upload = require('../utils/multerConfig');

router.post('/additem', upload.single('image'), addItem);
module.exports = router;