var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");


app
.get("/", function(req, res)
{
res.render("HenshinShop")
});
app.use('/public',express.static('public'));
app.use('/css',express.static(__dirname +'/css'));
