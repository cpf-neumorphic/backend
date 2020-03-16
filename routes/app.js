var assert = require('assert');
const express = require("express");
const db = require("../db");
const router = express.Router();


// var insertDocument = function(db) {
//     db.get().collection('users').insertOne( {
//             "NRIC": "S9526187D",
//             "Name": "Russell",
//             "Usage": [
//                 { "page_id": 0, "time_spent": 5 },
//                 { "page_id": 1, "time_spent": 7 }
//             ],
//             "Feature":{ "age": 35, "gender": "male", "income": 100000, "race":"chinese", "job_industry": "software", "education_level":"degree" },
//             "Recommendation" : [
//                 { "page_id":0, "duration": 6},
//                 { "page_id":1, "duration": 9}

//             ]
//         }, function(err, result) {
//         assert.equal(err, null);
//         console.log("Inserted a document into the users collection.");
        
//     });
// };

// var findFamilies = function(db) {
//     db.collection('users').find({"NRIC": "S9526187D"}).toArray(function(err, result){
//         console.log(result[0].Usage)
//     });
// };

// var updateFamilies = function(db) {
//     db.collection('users').update(
//         { "NRIC" : "S9526187D", "Usage.page_id":1},
//         {
//             $set: { "Usage.$.time_spent": 25},
//         },
//         function(err, results) {
//             console.log(results);
//     });
// };

// var updateFamilies = function(db) {
//     db.collection('users').update(
//         { "NRIC" : "S9526187D"},
//         {
//             $set: { "Recommendation": [0,1,2]},
//         },
//         function(err, results) {
//             console.log(results);
//     });
// };


// var removeFamilies = function(db) {
//     db.get().collection('users').deleteMany(
//         { "NRIC": "S9526187D" },
    
//     );
// };

var updateUsage = function(id, page_id, duration) {
    db.get().collection('users').updateOne(
        { "NRIC" : id, "Usage.page_id":page_id},
        {
            $set: { "Usage.$.time_spent": duration},
        },
        function(err, results) {
            // console.log(results);
    });
}

var insertUsage = function(id, page_id, duration, usage) {
    
    let obj = {"page_id": page_id, "time_spent": duration}
    usage.push(obj)

    db.get().collection('users').update(
        { "NRIC" : id},
        {
            $set: { "Usage": usage},
        },
        function(err, results) {
            // console.log(results);
    });
}

router.post("/updateUsage", (req,res)=>{
    let request = req.body
    let id = request.NRIC
    let page_id = request.pageID
    let duration = request.duration


    db.get().collection('users').find({"NRIC": id}).toArray(function(err, result){
        //console.log(result[0])
        for (let i = 0; i< result[0].Usage.length; i++){
            if (result[0].Usage[i].page_id === page_id){
                updateUsage(id, page_id, duration)
                break
            }else if(i === result[0].Usage.length - 1 && result[0].Usage[i].page_id !== page_id){
                insertUsage(id, page_id, duration, result[0].Usage)
            }
        }
    });

    res.end("OK")

})

router.get("/getAllUsage", (req,res)=>{

    db.get().collection('users').find({}).toArray(function(err, result){
        for(let i = 0; i<result.length; i++){
            
            let csvobj = {"NRIC": result[i].NRIC, "Usage": result[i].Usage}
        }
        // console.log(result[0].Usage)
    });
    res.end("OK")

})

router.get("/getRecommendation", (req, res) => {

    let id = req.query.NRIC
    db.get().collection('users').find({"NRIC": id}).toArray(function(err, result){
        console.log(result[0].Recommendation)
        res.end("OK")
    });

})

router.get("/getUsage", (req, res) => {

    let id = req.query.NRIC
    db.get().collection('users').find({"NRIC": id}).toArray(function(err, result){
        console.log(result[0].Usage)
        res.end("OK")
    });

})

router.post("/updateRecommendation", (req, res)=>{

    let request = req.body
    let id = request.NRIC
    let suggestions = request.Recommendation

    db.get().collection('users').update(
        { "NRIC" : id},
        {
            $set: { "Recommendation": suggestions},
        },
        function(err, results) {
            console.log(results);
    });
    res.end("OK")


})

// MongoClient.connect(url, function(err, client) {
// assert.equal(null, err);
// var db = client.db('cpf-neumorphic');

// // insertDocument(db);
// // findFamilies(db);
// //removeFamilies(db);
// updateFamilies(db)
// client.close()

// });

module.exports = router;