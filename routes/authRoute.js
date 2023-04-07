const express = require('express');
const { register, login } = require('../controllers/authController.js');
const router = express.Router();
const upload = require('../utils/multerConfig');

router.post('/register', upload.single('image'), register);
router.post('/login', login);

module.exports = router;
