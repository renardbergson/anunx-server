const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/routes/routes')
const ip = require('ip')

// cors
app.use(cors())

// routes
app.use('/', routes)

app.use('/images', express.static('public/uploads'))

// environment
require('dotenv').config({path: './.env.local'})

// database
const database = require('./src/database/database')
database()

// port and running process
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server is listening on port ${port} with the IP address = ${ip.address()}`))