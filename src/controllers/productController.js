const productModel = require('../models/productModel')
const formidable = require('formidable-serverless')
const path = require('path')
const fs = require('fs')

async function newProduct (req, res) {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: 'public/uploads',
    keepExtensions: true,
  })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({success: false})
    }

    const { images } = files
    const imagesToRename = images instanceof Array ? images : [images]

    const imagesToSave = []

    imagesToRename.forEach(image => {
      const timeStamp = Date.now()
      const random = Math.floor(Math.random() * 9999999) + 1
      const imgExtension = path.extname(image.name)
      const newName = `${timeStamp}_${random}${imgExtension}`

      const oldPath = path.join(__dirname, '../../' + image.path)
      const newPath = path.join(__dirname, '../../' + form.uploadDir + '/' + newName)

      imagesToSave.push({
        name: newName,
        path: newPath,
      })

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.log(err)
          return res.status(500).json({success: false})
        }
      })
    })

    const {
      title, 
      category,
      description, 
      price, 
      id,
      name, 
      email, 
      phone,   
      image,   
    } = fields

    const product = new productModel({
      title, 
      category,
      images: imagesToSave,
      description,
      price, 
      user: {
        id,
        name, 
        email,
        phone,
        image,
      }
    })

    const register = await product.save()

    if (register) {
      res.status(201).json({success: true})
    } else {
      return res.status(500).json({success: false})
    }
  })
}

module.exports = {
  newProduct
}