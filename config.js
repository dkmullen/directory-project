/*jshint esversion: 6 */

const uri = "mongodb://dkmullen:dorun77*@clusterdir-shard-00-02-jphcz.mongodb.net:27017,clusterdir-shard-00-00-jphcz.mongodb.net:27017,clusterdir-shard-00-01-jphcz.mongodb.net:27017/dir-project?ssl=true&replicaSet=ClusterDIR-shard-0&authSource=admin";

const uri2 = 'mongodb://localhost:27017/directory-app';

module.exports = {
    'secretKey': '',

    'mongoUrl' : uri
};

/*
"mongodb://dkmullen:<PASSWORD>@clusterdir-shard-00-00-jphcz.mongodb.net:27017,clusterdir-shard-00-01-jphcz.mongodb.net:27017,clusterdir-shard-00-02-jphcz.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=ClusterDIR-shard-0&authSource=admin"

"mongodb://username:PASSWORD@cluster0-shard-00-00-jphcz.mongodb.net:27017,cluster0-shard-00-01-jphcz.mongodb.net:27017,cluster0-shard-00-02-jphcz.mongodb.net:27017/DATABASE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
*/
