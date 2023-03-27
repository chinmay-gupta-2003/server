const express = require('express');
const router = express.Router();
const { addPost, editPost } = require( '../controllers/postController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + " " + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

router.post("/", upload.single('image'), addPost);
router.post("/editpost",editPost)

module.exports = router;