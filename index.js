const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/routes/routes')

// environment
require('dotenv').config({path: './.env.local'})

// body parser


// routes
app.use('/', routes)

// database
const database = require('./src/database/database')
database()

// port and running process
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server is listening on port ${port}`))