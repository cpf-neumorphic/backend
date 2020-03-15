const request = require("request");

var queryText = {
  NRIC: "S5177490P",
  Recommendation: [{page_id: 0, duration: 7},{page_id:1, duration: 7}]
};

const optionUpdateizeRecommendation = {
  method: "POST",
  url: "http://localhost:3001/api/updateRecommendation",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(queryText)
};

var queryText2 ={
  NRIC: "S5177490P",
  pageID: "5",
  duration: "14"
}

const optonUpdateUsage = {
  method: "POST",
  url: "http://localhost:3001/api/updateUsage",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(queryText2)
};


const optionGetRecommendation = {
    method: "GET",
    url: "http://localhost:3001/api/getRecommendation/?NRIC=S9526187D",
    headers: {
      Authorization: "Basic ",
      "Content-Type": "application/json;charset=utf-8"
    },
  };

const optionGetUsage = {
  method: "GET",
  url: "http://localhost:3001/api/getUsage/?NRIC=S5177490P",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
};

const optionGetAllUsage ={

  method: "GET",
  url: "http://localhost:3001/api/getAllUsage",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
}

request(optionGetUsage, function(error, response, body) {
  console.log(response);
});