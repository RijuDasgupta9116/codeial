const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");

// const path = require("path");
const port = 8000;

const app = express();

// using layouts and partials
app.use(expressLayouts);

// using static files
app.use(express.static("./assets"))

// use express router
app.use("/", require("./routes"));

// extract style and scripts from sub pages into the laytouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});