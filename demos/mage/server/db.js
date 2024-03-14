var databaseURI = "localhost:27017/obsidian";
var collections = ["users", "instances"];
var db = require('mongodb').MongoClient.connect(databaseURI, collections);

module.exports = db;

/*and then just require it where you need to connect to mongo like:
var db = require("./db");*/