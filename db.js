var MongoClient = require('mongodb').MongoClient;
var url = require('./credentials').mongoDBUrl

let mongodb;

function connect(){

    MongoClient.connect(url, function(err, client) {
        mongodb = client.db('neumorphic');
        console.log("DB Connected")
    });
}

function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};