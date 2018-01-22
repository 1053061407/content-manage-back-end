const express = require('express')
const router = express.Router()



// GET /signout 登出
router.get('/', function (req, res, next) {
  res.send('登出')
})

module.exports = router