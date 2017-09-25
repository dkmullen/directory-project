/*jshint esversion: 6 */

const uri = process.env.MONGOCLOUD_DIR_CONNECT_STR;
const uri2 = 'mongodb://localhost:27017/directory-app';

module.exports = {
    'secret': 'fakesecret',
    'mongoUrl' : uri2
};
// To start mongo on Windows - "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
