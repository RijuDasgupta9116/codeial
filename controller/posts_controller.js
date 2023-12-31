const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async (req,res) =>{
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        // if(req.xhr){
        //     return res.status(200).json({
        //         data: {
        //             post: post
        //         },
        //         message: "Post created!"
        //     })
        // }
    
        if(!post){
            console.log("Error in creating a post");
            return ;
        }
        req.flash('success','Post published!');
        return res.redirect('back');
    } catch (error) {
        console.log("Error in creating a post",error);
        req.flash('error',err);
        return;
    }
    
}

module.exports.destroy = async (req,res)=>{
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne({id: req.params.id});
            let comment = await Comment.deleteMany({post: req.params.id})
            
            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted!"
            //     })
            // }
            req.flash('success','Post and associated comments deleted!')
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error in deleting the post ",error);
    }

}