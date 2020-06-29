const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/ATNCompany?retryWrites=true&w=majority";

/// Database & Bảng dữ liệu cần Truy vấn
const NameDataBase = "ATNCompany";
const NameTable = "Product";

/// Thay ở đây !!!
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
    var vQuery = {  Product_Id : { $gte : 1 } };	
    dbo.collection(NameTable).find(vQuery).toArray()
    .then (results => {
        console.log(results);
        client.close();
    })
    .catch(error => console.error(error));
})
.catch(error => console.error(error));