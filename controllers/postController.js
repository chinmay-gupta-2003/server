const postModel = require("../models/postModel.js");

exports.addPost = async (req,res)=>{
    try{
      const newPost = await postModel.create({...req.body,image: req.file.path});
      res.status(201).json({
        status: 'success',
        data: {
        post: newPost,
        },
    }); 
    }
    catch (err) {
        res.status(400).json({
          status: 'fail',
          message: err.message,
        });
      }
}

exports.editPost = async (req, res) => {
    try {
      const post = await postModel.find({ userId: req.params.userId });
      if (!post) {
        return res.status(404).json({
          status: 'fail',
          message: 'Post not found',
        });
      }
      const updatedPost = await postModel.findOneAndUpdate(
        { userId: req.params.userId },
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
  