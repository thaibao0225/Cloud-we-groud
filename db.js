function nhuga()
{
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/CN?retryWrites=true&w=majority";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("CN");
    var myobj = {id : "hoho", name: "Company Inc", age: "7" };
    dbo.collection("id_CN").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}


//mongodb+srv://quynhnhu:14634222@cluster0-jjnie.mongodb.net/CN?retryWrites=true&w=majority

