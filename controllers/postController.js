const postModel = require("../models/postModel.js");

 const addPost = async (req,res,next)=>{
    console.log('Hi');
    console.log(req.file);
    const newPost = new postModel(req.body);
    console.log(newPost);
    newPost.image = req.file.path;
    console.log(newPost);
    if(!req.body.userId || !req.body.date){
        res.status(400).json({message:"Please fill all the fields"});
    }
    try{
        const savePost = await newPost.save();
        console.log(savePost);
        res.status(200).json(savePost);
    }
    catch(err){
        next(err);
    }
}

module.exports = {addPost};