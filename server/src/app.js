const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const util = require('util')
const MongoClient = require('mongodb').MongoClient;
const monk = require('monk');

const jwt = require('jsonwebtoken')

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

const conf = require('../conf');
const db_con = require('./config')
require('./route')(app)
app.listen(process.env.PORT|| conf.db.Port)
