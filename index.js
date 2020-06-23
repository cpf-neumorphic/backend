/* Initialization */
const express = require('express');
const db = require('./db');
const apiRouter = require('./routes/app');

const app = express();
app.use(require('cors')({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

// db.connect()
// db.connect(()=>{
//     app.listen(process.env.PORT || 3001, function(){
//         console.log("Listening");
//     })
// })

app.use('/api', apiRouter);

module.exports = app