const express = require('express')
const cors = require('cors')
const app = express()

app.get('/', (req, res) => {
  res.send('está funcionando!')
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server is listening on port ${port}`))