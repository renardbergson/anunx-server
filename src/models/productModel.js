const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema({
  name: String,
  path: String, 
})

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "o campo 'título do anúncio' é obrigatório"]
  },
  category: {
    type: String,
    required: [true, "o campo 'categoria' é obrigatório"]
  },

  images: {
    type: [imagesSchema],
    default: undefined,
  },

  description: {
    type: String,
    required: [true, "o campo 'descrição' é obrigatório"]
  },
  price: {
    type: Number,
    required: [true, "o campo 'preço' é obrigatório"]
  },

  user: {
    id: String,
    name: String,
    email: String,
    phone: String,
    image: String,
  }
})

module.exports = mongoose.models.products || mongoose.model('products', schema)