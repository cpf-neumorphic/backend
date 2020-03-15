var MongoClient = require('mongodb').MongoClient;
var url = require('./credentials').mongoDBUrl

let mongodb;

function connect(callback){

    MongoClient.connect(url, function(err, client) {
        mongodb = client.db('cpf-neumorphic');
        callback();
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