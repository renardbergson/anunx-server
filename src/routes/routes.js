const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('está funcionando ainda!')
})

module.exports = router