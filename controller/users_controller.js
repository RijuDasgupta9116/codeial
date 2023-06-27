const User = require("../models/user");


module.exports.profile = async(req,res)=>{

    // return res.render('user_profile',{
    //     title:"User Profile"
    // })
    try {
        if(req.cookies.user_id){
            let user = await User.findOne({_id : req.cookies.user_id});
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                });
            }

            // return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("Getting error after sign-in before profile view ",error);
    }    
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
module.exports.createSession = async (req,res) => {
    /* Steps for authentications
        1. Find the user
        2. handle user found
        3. handle password which didn't match
        4. handle session creation
        5. handle user not found
    */
    
    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            
            res.cookie('user_id',user.id);
            // console.log(res);
            return res.redirect('/users/profile')
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error in sign-in",error);
    }

}