const postModel = require('../models/postModel.js');
const mongoose = require('mongoose');

exports.addPost = async (req, res) => {
  try {
    const newPost = await postModel.create({
      ...req.body,
      image: req.file.path,
    });
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await postModel.find({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    console.log(post[0]);
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    console.log(updatedPost);
    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPost,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
