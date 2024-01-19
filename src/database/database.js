const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

async function dbConnect() {
  mongoose.connect(MONGODB_URI)
  
  const db = mongoose.connection
  
  db.once('open', () => {console.log('APP CONNECTED TO DATABASE!')})
  db.on('error', () => {console.error.bind(console, 'DATABASE ERROR!')})
}

module.exports = dbConnect