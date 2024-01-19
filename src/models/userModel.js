const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "o campo 'nome' é obrigatório"]
  },
  email: {
    type: String,
    required: [true, "o campo 'e-mail' é obrigatório"]
  },
  password: {
    type: String,
    required: [true, "o campo 'senha' é obrigatório"]
  }
})

module.exports = mongoose.models.users || mongoose.model('users', schema)