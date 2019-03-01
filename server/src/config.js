
const monk = require('monk');
const conf = require('../conf');
const mongoose = require('mongoose');

const db_con = mongoose.connect(conf.DB_String)
.then(resp=>{
    console.log('connected')
})
.catch(err=>{
    console.log('error is ',err);
})
module.exports = db_con;