const express = require('express');
const router = express.Router();
const {
  addPost,
  editPost,
  getAllPosts,
} = require('../controllers/postController');
const upload = require('../utils/multerConfig');

router.post('/', upload.single('image'), addPost);
router.put('/editpost/:id', editPost);
router.get('/', getAllPosts);

module.exports = router;
