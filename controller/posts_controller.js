const Post = require('../models/post');
const Comment = require('../models/comment');
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

module.exports.destroy = async (req,res)=>{
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne({id: req.params.id});
            let comment = await Comment.deleteMany({post: req.params.id})
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error in deleting the post ",error);
    }

}