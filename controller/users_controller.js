const User = require("../models/user");


module.exports.profile = async function(req,res){
    try {
        let user = await User.findById(req.params.id)
        return res.render('user_profile',{
            title:"User Profile",
            profile_user : user
        });
    } catch (error) {
        console.log(error);
    }
    
    
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try {
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        } catch (error) {
            console.log(error);
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

// render sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

// render sign in page

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}


// creating user for sign-up as well as check if the user is already present or not
module.exports.create = async (req, res) => {
    // check the password and confirm password is same or not
    if(req.body.password != req.body.confirm_password){
        console.log("Password and Confirm Password must be equal");
        return res.redirect('back');
    }
    try{

        // check the usre is already present or not. If present then redirect to the same page
        let user = await User.findOne({email:req.body.email});
        if(user){
            console.log("User already present in DB");
            res.redirect('back');
        }
        else{

            // Otherwise insert into the database and redirect to sign in page
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            await User.insertMany([data])
            res.redirect('/users/sign-in');
        }
    
    }
    // if gets any error show it in the console
    catch(err){
        console.log("Error in finding user in signing up");
        return;
    }
    

    
};

// sign in and create a session for user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        console.log(err);
    });
    req.flash('success','Logged out');
    
    return res.redirect('/');
}