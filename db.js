var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://cpf-neumorphic:qStpEFKhgtoODsZs94AVKlocKB6mE5GLf2lg4nN8aZrIHkroPCdxASEjWKe9nxu5DXJ8JlLWqsEr7O2izrCUiQ%3D%3D@cpf-neumorphic.mongo.cosmos.azure.com:10255/?ssl=true&appName=@cpf-neumorphic@';

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