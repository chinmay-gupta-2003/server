const postModel = require("../models/postModel.js");

exports.addPost = async (req,res)=>{
    const newPost = new postModel(req.body);
    newPost.image = req.file.path;
    try{
        const savePost = await newPost.save();
        res.status(201).json({
            status: 'success',
            data: {
              post: savePost,
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