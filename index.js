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


////////////////////

////////////////////////////////
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
  //////////////////////////////////////////////
  app.post('/login', function (req, res) {
	var body = req.body;
	var us = body.username;
	var pd = body.password;
	console.log(body);
	MongoClient.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true } , function(err, db) {
				if (err) throw err;
				var dbo = db.db("Thunghiem");
				var myobj = {ID : us, Pass: pd};
				dbo.collection("User").findOne(myobj, function(err, res) {
				  if (err) throw err;
				  console.log("1 document inserted");
				  db.close();
				});
			});
	// ...
  });
  ///////////////////////////////////////////////////////
  
// app.post('/taotaikhoan', (req, res) => {
	
// 	const username = req.query.username;
// 	const password = req.query.password;
//     console.log(body);
// 	 let userInput = {
// 		username: username,
// 		password: password
// 	 };
// 	 console.log(userInput);

// 	  MongoClient.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true } , function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("Thunghiem");
// 		var myobj = {ID : username, Pass: password};
// 		dbo.collection("User").insertOne(myobj, function(err, res) {
// 		  if (err) throw err;
// 		  console.log("1 document inserted");
// 		  db.close();
// 		});
// 	  });
//   });
  
	
		
  
  
////////////////find///////////////

////////////////////insert/////////////////////////
// function insertDB()
// { 
//   MongoClient.connect(uri, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("ATNCompany");
//     var myobj = {Product_Id:"3", Product_Name: "Nhune", Discription: "leuleuleu" , Price:"60$", Product_Img:"ban001.jpg"};
//     dbo.collection("Product").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });
// }
// insertDB();
// /// ***************** ***************** *****************

// /////////////////////////////////
// function viewDB(req, res){
// 	MongoClient.connect(
// 		uri, 
// 		{ useNewUrlParser: true , useUnifiedTopology: true }
// 	)
// 	.then (client => {
// 	  var dbo = client.db(NameDataBase);
// 	////// Điều kiện truy vấn 
// 	  /// <, <=, >, >=, != 
// 	///// $lt, $lte, $gt, $gte, $ne
// 	// var vQuery = {
// 	// 	User_name: /.*u.*/
// 		//User_id : { $gte : 1 }
// 		// };
// 		var vQuery = {  Product_Id : { $gte : 1 } };	
// 		dbo.collection(NameTable).find(vQuery).toArray()
// 		.then (results => {
// 			console.log(results);
// 			client.close();
// 		})
// 		.catch(error => console.error(error));
// 	})
// 	.catch(error => console.error(error));
// }
// viewDB();
 //load view Engine
 app.use(express.static('public'));//
 app.set('views', path.join(__dirname, './views'));
 app.listen(8080);
 