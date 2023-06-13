const express = require("express");
// const path = require("path");
const port = 8000;

const app = express();

// use express router
app.use("/", require("./routes"));

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});