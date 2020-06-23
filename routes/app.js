var assert = require('assert');
const express = require("express");
const fs = require('fs');
const path = require('path');
const os = require('os');
const {parseAsync} = require('json2csv');
const db = require("../db");
const router = express.Router();


var updateUsage = function(id, page_id, duration) {
    db.get().collection('users').updateOne(
        { "NRIC" : id, "Usage.page_id":page_id},
        {
            $set: { "Usage.$.time_spent": duration},
        },
        function(err, results) {
            console.log(results);
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

async function writeToFile(data, filename){
    const field = ["NRIC","page_id","time_spent"];
    const opts = {field};
    const resultcsv = await parseAsync(data, opts);
    fs.writeFileSync(filename, resultcsv)
}

router.get("/getAllUsage", (req,res)=>{

    let data = [];
    const filename = path.join(__dirname, '../public/usage/usage_data.csv');
    const output = [];

    db.get().collection('users').find({}).toArray(function(err, result){
        for(let i = 0; i<result.length; i++){
            let id = result[i].NRIC
            for (let j = 0; j<result[i].Usage.length;j++){
                let pid = result[i].Usage[j].page_id
                let time = result[i].Usage[j].time_spent
                data.push({NRIC: id, page_id: pid, time_spent: time})
            }
        }

        //Write to csv
        writeToFile(data,filename);
 
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

module.exports = router;