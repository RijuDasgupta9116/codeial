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
        if(!comment){
            console.log("Error in posting comment");
            return ;
        }
        post.comments.push(comment);
        post.save();
        res.redirect('/');
    }
   } catch (error) {
    console.log("Error in posting comment",error);
   }
}


// try{
//     let comment = await Comment.create({
//         content: req.body.content,
//         user: req.user._id,
//         post: req.post._id
//     })

//     if(!comment){
//         console.log("Error in creating a comment");
//         return ;
//     }
//     return res.redirect('back');
// }
// catch(error){
//     console.log("Error in creating Comment",error);
// }