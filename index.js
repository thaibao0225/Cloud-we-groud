var express = require("express");
 var app = express();
 app.set("view engine", "ejs");
 app.set("views","./views");
 app.listen(process.env.PORT || 3000);

 app.get("/", function(reg,res){
 	res.render("HenshinShop");
 });