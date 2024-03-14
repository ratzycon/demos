var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


MongoClient.connect('mongodb://127.0.0.1:27017/obsidian', function(err, db){
   if(err) throw err;
   //createGameInstance(db, "test instance");
   getInstances(db);
});

function createUser(username, pass){

}

function getInstances(db){
  db.collection('instances').find().toArray(function(err, results) {
      console.dir(results);
      db.close();
    });
}

function createGameInstance(db, name){
  var collection = db.collection('instances');
  collection.insert({id:0, name:name}, function(err, result) { console.log("instance created.");});
  db.close();
}

