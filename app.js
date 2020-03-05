var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID
var url =
  'mongodb://cpf-neumorphic:qStpEFKhgtoODsZs94AVKlocKB6mE5GLf2lg4nN8aZrIHkroPCdxASEjWKe9nxu5DXJ8JlLWqsEr7O2izrCUiQ%3D%3D@cpf-neumorphic.mongo.cosmos.azure.com:10255/?ssl=true&appName=@cpf-neumorphic@'

var insertDocument = function(db) {
  db.collection('users').insertOne(
    {
      NRIC: 'S9526187D',
      Name: 'Russell',
      Usage: [
        { page_id: 0, time_spent: 5 },
        { page_id: 1, time_spent: 7 }
      ],
      Feature: {
        age: 35,
        gender: 'male',
        income: 100000,
        race: 'chinese',
        job_industry: 'software',
        education_level: 'degree'
      },
      Recommendation: [0, 1, 2]
    },
    function(err, result) {
      assert.equal(err, null)
      console.log('Inserted a document into the users collection.')
    }
  )
}

var findFamilies = function(db) {
  db.collection('users')
    .find({ NRIC: 'S9526187D' })
    .toArray(function(err, result) {
      console.log(result[0].Usage)
    })
}

var updateFamilies = function(db) {
  db.collection('users').update(
    { NRIC: 'S9526187D', 'Usage.page_id': 1 },
    {
      $set: { 'Usage.$.time_spent': 25 }
    },
    function(err, results) {
      console.log(results)
    }
  )
}

var removeFamilies = function(db) {
  db.collection('users').deleteMany({ NRIC: 'S9474355I' })
}

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  var db = client.db('cpf-neumorphic')

  // insertDocument(db);
  findFamilies(db)
  //removeFamilies(db);
  // updateFamilies(db)
  client.close()
})
