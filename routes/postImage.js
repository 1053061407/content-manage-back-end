const express = require('express')
const path = require('path')
const router = express.Router()
// 处理表单及文件上传的中间件

router.post('/',function (req, res, next) {
  var filename = path.basename(req.files.file.path)
  if(req.files) {
    res.json({
      files: {
        path: '/public/img'+ filename
      }
    })
  }
})
module.exports = router