const userModel = require('../models/userModel')
const { crypto, compare } = require('../utils/password')

async function getUsers (req, res) {
  const customers = await userModel.find()

  res.send(customers)
  res.status(400).end()
}

async function newUser (req, res) {
  const { name, email, password } = req.body

  const passCrypto = await crypto(password)

  const user = new userModel({
    name: name,
    email: email,
    password: passCrypto,
  })

  await user.save()

  res.send({success: true})
}

async function signIn (req, res) {
  const {email, password} = req.body

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.send({success: false, message: 'invalid'})
  }

  const passIsCorrect = await compare(password, user.password)

  if (!passIsCorrect) {
    return res.send({success: false, message: 'invalid'})
  }
  
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  })
}

module.exports = {
  getUsers,
  newUser,
  signIn,
}