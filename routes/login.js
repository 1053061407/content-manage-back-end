const MD5 = require('crypto-js/md5')
const express = require('express')
const router = express.Router()
const User = require('../models/user')


const user = new User()
var salt
function getRandomSalt(){
  var salt =  Math.random().toString().slice(2, 8);
  console.log(salt)
  return salt
}
// GET 获取盐
router.get('/get_salt', function (req, res, next) {
  salt = getRandomSalt()
  res.json({
    salt: salt
  })
})
// POST
router.post('/', function (req, res, next) {
  var userName = req.body.username
  var password = req.body.password
  user.getUsers().then(users => {
    users.forEach(user => {
      if(user.userName == userName)
      {
        // 先对密码进行一次加密
        const cryptPassword = MD5(user.password).toString()
        // 将加密后的密码+盐 再进行一次加密
        const cryptPassword2= MD5(cryptPassword+salt).toString()
        if(cryptPassword2 == password)
        {
          req.session.user = user.userName
          res.status(200).send('1')
        }

      }
    })
  })
})

module.exports = router