const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/routes/routes')

app.use('/', routes)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server is listening on port ${port}`))