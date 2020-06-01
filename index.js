const path  = require('path');

var express = require("express");
 var app = express();
 app.set("view engine", "ejs");
 app.set("views","./views");
 

 app.get("/", function(reg,res){
 	res.render("HenshinShop");
 });
 //load view Engine
 app.use(express.static('public'));
 app.set('views', path.join(__dirname, './views'));
 app.set('view engine', 'pug');
 res.render("index");
 app.listen(process.env.PORT || 3000);