const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
    },
    async function(email, password, done){
        try {
            let user = await User.findOne({email:email});
            if(!user || user.password != password){
                console.log("Invalid Username/ Password");
                return done(null, false);
            }

            return done(null,user);
        } catch (error) {
            console.log("Error in finding user --> passport");
            return done(err);
        }
    }
))

// Serializing the user to decide which key is to be kept in the cookiesf
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// desierializing the user from the key in the cookies
// passport.deserializeUser(function(id,done){
//     User.findById(id,function(err,user){
//         if(err){
//             console.log("Error in finding user --> passport");
//             return done(err);
//         }
//         return done(null,user);
//     })
// })
passport.deserializeUser(async function(id,done){
    try {
        let user = await User.findById(id);
        return done(null,user);
    } catch (error) {
        console.log("Error in finding user --> passport");
        return done(err);
    }
})

module.exports = passport;