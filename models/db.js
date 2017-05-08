/*jshint esversion: 6 */
//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/directory-app');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://username:PASSWORD@cluster0-shard-00-00-jphcz.mongodb.net:27017,cluster0-shard-00-01-jphcz.mongodb.net:27017,cluster0-shard-00-02-jphcz.mongodb.net:27017/DATABASE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

MongoClient.connect(uri, function(err, db) {
  db.close();
});
