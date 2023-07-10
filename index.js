const express = require("express");
const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocal  =require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);


// const path = require("path");
const port = 8000;

const app = express();

app.use(express.urlencoded());
app.use(cookieParser());

// using layouts and partials
app.use(expressLayouts);

// using static files
app.use(express.static("./assets"))


// extract style and scripts from sub pages into the laytouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

// creating session using express-middleware and passport
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'Connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});