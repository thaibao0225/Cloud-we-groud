/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/ATNCompany?retryWrites=true&w=majority";
const mongosee = require('mongoose');

ObjectId = require('mongodb').ObjectID;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path  = require('path');
var express = require("express");
var app = express();
app.set("view engine", "ejs");
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Bien

var blockPayment = 0; 
var arrBill = [];
var lanclick;

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

app.get("/", function(req,res){
	res.render("page/HenshinShop");
});

app.get("/productt", function(req,res){
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
				var dbo = db.db("ATNCompany");
				var myobj = {ID : us, Pass: pd};
				dbo.collection("User").insertOne(myobj, function(err, res) {
				  if (err) throw err;
				  console.log("1 user account inserted");
				  db.close();
				});
			});
	// ...
  });
  //////////////////////////////////////////////////////////////////////
 app.post('/login', function (req, res) {
	var body = req.body;
	MongoClient.connect(uri,{ useUnifiedTopology: true }).then (client =>{
	console.log(body);
	var dbo = client.db("ATNCompany"); 
	var query = {ID : body.username, Pass: body.password};
	dbo.collection("Admin").find(query).toArray()
		.then (result => {
			if(result.length == 1)
			{
				console.log("done");
				res.redirect('/');
			}else{
				console.log("wrong");
				client.close();
				res.send('Sai rồi bạn ơi nhập lại đi nhé :<');
			}
		})
		.catch(error=> console.error(error));
	})
	.catch(error=> console.error(error));
	
});

/// Database & Bảng dữ liệu cần Truy vấn cho bản tìm kiếm oder///////////////////////////////////////////////
const Product = require('./models/product');
//const urilc = 'mongodb://localhost:27017/ATNCompany';

/// ***************** Database & Bảng dữ liệu cần Truy vấn
const NameDataBase = "ATNCompany";




/// ***************** ***************** *****************
app.get('/product/:stt', viewProduct);
function viewProduct(request, response) {
	// request.params.stt;
    var stt = Number(request.params.stt);

    // const inf = await runQuery( "Products" , {} );
    if (xflag == 0) {
        readDB();
		response.send("Web - Product Catalog page !" + stt);
    } else {
        console.log(vResult[stt]);
        response.render("page/productdetail", vResult[stt]);
	}
}
/////////////////////////////////////////////////////////////////
app.get('/order', viewOrder);
function viewOrder(request, response) {
    arrBill = [];
    lanclick = 0;
	blockPayment = 0;
    responseDB(response, "page/order",
				Product, {}, {}, "productlist");
}


var listkq

//
app.get('/payment', viewPayment);
	
function viewPayment(request, response) {
    //response.send("Web - PAYMENT page !" + request.query.dssp);
    var dssp = request.query.dssp;
    listkq = dssp.split("_");

    listsp = [];
    var count = listkq.length/2; 

    if (listkq.length % 2 != 0 )
        count = ((listkq.length - 1) /2);

    for (i=0; i< count; i++) {
        listsp.push(
            { Name :listkq[i*2], Price : listkq[i*2+3], Num: listkq[i*2+1]},
        );
    }
    

    
 
    if(blockPayment == 0)
    {
        for (j=0; j< count; j++){
            query = {
                _id: ObjectId(listsp[j].Name)
            };
    
            runQuerypayment("Product",query);
        }
        blockPayment = 1;
    }
    else
    {
        console.log("blockpayment = "+ blockPayment);
        if (blockPayment == 1)
        {
            for(var i = 0; i< count; i++)
            {
                console.log("aa");
                arrBill[i].Price *= listkq[i*2+1];
                arrBill[i].Nums = listkq[i*2+1];
            }
            blockPayment = 2;
            
        }

    }
    
    ///////////////
   
    response.render("page/payment", {productlist : arrBill });   
}
//

////////////////////////////////////////////////////////////////
async function runQuerypayment(NameTable , vQuery) {
	
	const xdbo = await MongoClient.connect(
		uri, 
		{ useNewUrlParser: true , useUnifiedTopology: true }
    );    
	const dbo = xdbo.db(NameDataBase);
	////// Run - Query
	const results = await dbo.collection(NameTable).find(vQuery).toArray();
    
    ///
    arrBill.push(
        {
            _id : results[0]._id,
            Name : results[0].Name,
            Prices : results[0].Price, // van chua chinh sua
            Nums : 1,  // van chua chinh sua
            Img : results[0].urlImg,
        }
    );
    //arrBill.push(results);
    console.log(arrBill);

    
    //xflag = 1;

	return results;
}
////////////////////////////////////////////////////////////////



var xflag = 0;
var vResult = [];

async function runQuery(NameTable , vQuery) {
	
	const xdbo = await MongoClient.connect(
		uri, 
		{ useNewUrlParser: true , useUnifiedTopology: true }
    );    
	const dbo = xdbo.db(NameDataBase);
	////// Run - Query
	const rts = await dbo.collection(NameTable).find(vQuery).toArray();

    ///
    vResult = rts;
    //console.log(rts);
    xflag = 1;

	return rts;
}

/// ***************** ***************** *****************
/// *****************
async function readDB() {
    const inf = await runQuery( "Product" , {} );
    vResult = inf;
	xflag = 1;
	//console.log("-----------------");
	//console.log(inf);
}


/// ***************** 
async function responseDB(response, xview, xModel, xQuery, xparams, xtag) {

    const xdb = await mongosee.connect(
        uri, 
        { useNewUrlParser: true , useUnifiedTopology: true }
    );
    
    if (xdb) 
    {
        const kq = await xModel.find(xQuery).exec();

        if (kq) {
            xparams[xtag] = kq;            
            console.log(xview + "THanh cong !");
            response.render(xview, xparams);
        }
    } else {
        response.send("ko thanh cong !");
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'));//
 app.listen(5000);
 