var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(process.env.PORT || 3000);

app
.get("/", function(req, res)
{
res.render("HenshinShop")
});


var http = require('http');
     var fs = require('fs');

 //creating server
 http.createServer(function (req, res) {
   fs.readFile('LandingPage.html', function (err, html) {
     res.writeHead(200, { 'Content-Type': 'text/html' });
     res.write(html);
     res.end();

   });
 }).listen(8080);