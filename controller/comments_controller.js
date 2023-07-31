const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async (req,res)=>{
   try {
    let post = await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        // if(!comment){
        //     console.log("Error in posting comment");
        //     return ;
        // }

        // if(req.xhr){
        //     return res.status(200).json({
        //         data: {
        //             comment: comment
        //         },
        //         message: "Comment created!"
        //     })
        // }

        post.comments.push(comment);
        post.save();
        req.flash('success','Comment published!');
        return res.redirect('/');
    }
   } catch (error) {
    console.log("Error in posting comment",error);
    req.flash('error',err);
    return res.redirect('back');
   }
}


module.exports.destroy = async (req,res)=>{
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne({id: req.params.id});
            await Post.findByIdAndUpdate(postId,{$pull: {comments: req.param.id}});
            
            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             comment_id: req.params.id
            //         },
            //         message: "Comment deleted!"
            //     })
            // }
            req.flash('success','Comment deleted!')
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error in deleting comment ",error);
        req.flash('error',err);
        return res.redirect('back');
    }
}