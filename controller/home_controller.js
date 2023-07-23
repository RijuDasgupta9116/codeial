const Post = require("../models/post");

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    try {
        let posts = await Post.find({}).populate('user').populate({
            path:'comments',
            populate:{
                path: 'user'
            }
        }).exec();
        return res.render('home',{
            title:"Codeial | Home",
            posts: posts
        });
        
    } catch (error) {
       console.log("Error in finding post",error); 
    }
    
    
}