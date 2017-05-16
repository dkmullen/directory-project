/*jshint esversion: 6 */
// This is an old and probably unneeded file for connecting with DB. Replaced with config.js
 const uri2 = mongoose.connect('mongodb://localhost/directory-app');

const uri = "mongodb://username:PASSWORD@cluster0-shard-00-00-jphcz.mongodb.net:27017,cluster0-shard-00-01-jphcz.mongodb.net:27017,cluster0-shard-00-02-jphcz.mongodb.net:27017/DATABASE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(uri, function(err, db) {
  db.close();
});
