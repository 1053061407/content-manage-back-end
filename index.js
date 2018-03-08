const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config-lite')(__dirname)
const login = require('./routes/login')
const logout = require('./routes/logout')
const postImage = require('./routes/postImage')
const articles = require('./routes/getAllArticles')
const bodyParser = require('body-parser')
const formidable = require('express-formidable')
const cookieParser = require('cookie-parser')

app.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9527");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  // res.header('Content-Type', 'application/json')
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(cookieParser())
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    // expires:  new Date(Date.now() + 8*60*60*1000 + config.session.maxAge),
    httpOnly: false,
    maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}))


//设置 extend为true 则代表可以解析内嵌的json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/login',login)
app.use('/logout',logout)
app.use('/',articles)

// 上传文件的中间件
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))
app.use('/post_img',postImage)


// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')


app.listen(3000)
