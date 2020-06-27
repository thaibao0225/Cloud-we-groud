
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/CN?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("CN").collection("id_CN");
//   // perform actions on the collection object
//   client.close();
// });

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/CN?retryWrites=true&w=majority";

// MongoClient.connect(uri, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("CN");
//   dbo.collection("User").find({}).toArray(function(err, result) {
// 	if (err) throw err;
// 	console.log(result);
// 	db.close();
//   });
// });
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/CN?retryWrites=true&w=majority";
const mongosee = require('mongoose');
/// Database & Bảng dữ liệu cần Truy vấn
const NameDataBase = "CN";
const NameTable = "User";

///////////////////////////////
const path  = require('path');
var express = require("express");
var app = express();
app.set("view engine", "ejs");
//  app.set("views","./views");
 /// ***************** ***************** *****************

//  app.get("/", function(req,res){
//  	res.render("HenshinShop");
//  });
//truyền một link mới với một page mới


app.get("/about", function(req,res){
	res.render("page/about");
	//res.sendFile(path.join(__dirname + '/views/page/about.html'));
});

app.get("/taotaikhoan", function(req,res){
	res.sendFile(path.join(__dirname + '/views/page/cre-account.html'));
});


app.get("/account", function(req,res){
	res.sendFile(path.join(__dirname + '/views/page/manage-account.html'));
});

app.get("/order", function(req,res){
	res.sendFile(path.join(__dirname + '/views/page/order.html'));
});

app.get("/", function(req,res){
	res.sendFile(path.join(__dirname + '/views/page/HenshinShop.html'));
});


app.get("/product", function(req,res){
	res.sendFile(path.join(__dirname + '/views/page/product-toy.html'));
});

app.get('/login', viewLogin);
function viewLogin(req, res){
	if ((req.query.username == "quynhnhu" )&& (req.query.password == "yeuai"))
	{
		res.redirect('/Trangchu-Admin');
	}else if(req.query.username =="chinhanh" && req.query.password == "yeuai"){
		res.redirect('/Trangchu-Chinhanh')
	}
	else{
		
    	res.sendFile(path.join(__dirname + '/views/page/login.html'));
	
	}
	
}


app.get('/db', viewDB);
function viewDB(req, res){
	MongoClient.connect(
		uri, 
		{ useNewUrlParser: true , useUnifiedTopology: true }
	)
	.then (client => {
	  var dbo = client.db(NameDataBase);
	////// Điều kiện truy vấn 
	  /// <, <=, >, >=, != 
	///// $lt, $lte, $gt, $gte, $ne
	// var vQuery = {
	// 	User_name: /.*u.*/
		//User_id : { $gte : 1 }
		// };
	var vQuery = {  
		User_name: /.*q.*/,
		User_id : { $gte : 1 } };	
	dbo.collection(NameTable).find(vQuery).toArray()
	.then (results => {
		console.log(results);
		client.close();
	})
	.catch(error => console.error(error));
	})
	.catch(error => console.error(error));

	res.end("END !");
}
/// ***************** ***************** *****************
 //load view Engine
 app.use(express.static('public'));//
 app.set('views', path.join(__dirname, './views'));
 app.listen(5002);
 