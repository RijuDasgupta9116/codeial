const Post = require("../models/post");
const User = require('../models/user');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path: 'user'
            }
        }).exec();

        try {
            let users = await User.find({});
            return res.render('home',{
                title:"Codeial | Home",
                posts: posts,
                all_users: users
            });
        } catch (error) {
            console.log(error);
        }

        
        
    } catch (error) {
       console.log("Error in finding post",error); 
    }
    
    
}