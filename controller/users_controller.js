const User = require("../models/user");


module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:"User Profile"
    });
}

// render sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

// render sign in page

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}


// get the sign up data
module.exports.create = (req,res) => {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},async function(err,user){
        if(err){
            console.log("Error in finding user in signing up");
            return;
        }

        if(!user){
            let newUser  = await User.create(req.body);
            
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }

    });
}

// sign in and create a session for user
module.exports.createSession = function(req,res){
    // TODO later
}