const express = require('express')
const router = require('express').Router()

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')

// home
router.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor da maior plataforma de vendas do Brasil! 🎉 Anunx 🎊')
})

// users
router.get('/users', userController.getUsers)
router.post('/users/new', express.json() ,userController.newUser)
router.post('/users/signIn', express.json(), userController.signIn)

// products
router.post('/products/new', productController.newProduct)

module.exports = router