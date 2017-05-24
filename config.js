/*jshint esversion: 6 */

const uri = "mongodb://username:PASSWORD@cluster0-shard-00-00-jphcz.mongodb.net:27017,cluster0-shard-00-01-jphcz.mongodb.net:27017,cluster0-shard-00-02-jphcz.mongodb.net:27017/DATABASE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

const uri2 = 'mongodb://localhost:27017/directory-app';
module.exports = {
    'secretKey': '',

    'mongoUrl' : uri2
};
