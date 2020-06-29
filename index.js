/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/ATNCompany?retryWrites=true&w=majority";
const mongosee = require('mongoose');
/// Database & Bảng dữ liệu cần Truy vấn
const NameDataBase = "ATNCompany";
const NameTable = "Product";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path  = require('path');
var express = require("express");
var app = express();
app.set("view engine", "ejs");
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/about", function(req,res){
	res.render("page/about");
	//res.sendFile(path.join(__dirname + '/views/page/about.html'));
});

app.get("/taotaikhoan", function(req,res){
	res.render("page/cre-account");
});

app.get("/login", function(req,res){
	res.render("page/login");
});

app.get("/account", function(req,res){
	res.render("page/mange-account");
});

app.get("/order", function(req,res){
	res.render("page/order");
});

app.get("/", function(req,res){
	res.render("page/HenshinShop");
});

app.get("/product", function(req,res){
	res.render("page/product-toy");
});


////////////////////////////////////////////////////
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/taotaikhoan', function (req, res) {
	var body = req.body;
	var us = body.username;
	var pd = body.password;
	console.log(body);
	MongoClient.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true } , function(err, db) {
				if (err) throw err;
				var dbo = db.db("Thunghiem");
				var myobj = {ID : us, Pass: pd};
				dbo.collection("User").insertOne(myobj, function(err, res) {
				  if (err) throw err;
				  console.log("1 document inserted");
				  db.close();
				});
			});
	// ...
  });
  //////////////////////////////////////////////////////////////////////
  app.post('/login', function (req, res) {
	var body = req.body;
	var us = body.username;
	var pd = body.password;
	console.log(body);
	MongoClient.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true } , function(err, db) {
				if (err) throw err;
				var dbo = db.db("Thunghiem");
				var myobj = {ID : us, Pass: pd};
				dbo.collection("User").find(myobj, function(err, res) {
				  if (err) throw err;
				  console.log("1");
				  db.close();
				});
			});
	// ...
  });
  //////////////////////////////////////////////////
 
 app.use(express.static('public'));//
 app.set('views', path.join(__dirname, './views'));
 app.listen(5000);
 