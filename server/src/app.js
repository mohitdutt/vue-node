const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const util = require('util')

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

const port = 8081
app.post('/register',(req, res) => {debugger
    res.send({
        // res: util.inspect(req),
        message: `hello ${req.body.email}`
    })
})

console.log('server started at port '+ port)
app.listen(process.env.PORT|| port)
