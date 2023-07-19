const Post = require('../models/post');

module.exports.create = async (req,res) =>{
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
    
        if(!post){
            console.log("Error in creating a post");
            return ;
        }
        return res.redirect('back');
    } catch (error) {
        console.log("Error in creating a post",error);
    }
    
}

