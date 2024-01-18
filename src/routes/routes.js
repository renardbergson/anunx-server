const router = require('express').Router()

const userController = require('../controllers/userController')

router.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor da maior plataforma de vendas do Brasil! 🎉 Anunx 🎊')
})

router.get('/users', userController.getUsers)

module.exports = router