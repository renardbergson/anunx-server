const productModel = require('../models/productModel')
const formidable = require('formidable-serverless')
const path = require('path')
const fs = require('fs')

async function ads (req, res) {
  const {productID} = req.params

  const obj = productID ? {_id: productID} : null

  const search = await productModel.find(obj)
  // obg is null ? so, we search an array, else we search only an object

  if (search) {
    res.status(200).send(search)
  } else {
    res.status(400).send({success: false})
  }
}

async function highlights (req, res) {
  const products = await productModel.aggregate([{
    $sample: {size: 6}
  }])

  res.send(products)
}

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

async function myAds (req, res) {
  const {userID} = req.params

  const products = await productModel.find({'user.id' : userID})

  if (products) {
    res.status(200).send(products)
  } else {
    res.status(500).send({success: false})
  }
}

async function removeAd (req, res) {
  const {productID} = req.body

  const remove = await productModel.findByIdAndDelete(productID)

  if (remove) {
    res.status(200).send({success: true})
  } else {
    res.status(400).send({success: false})
  }
}

module.exports = {
  ads,
  highlights,
  newProduct,
  myAds,
  removeAd,
}