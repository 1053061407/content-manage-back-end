const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const articles = new Article()
router.get('/get_all_articles',function (req, res, next) {
  var page = req.param('page')
  var category = req.param('category')
  var data = []
  articles.getArticles().then(articles => {
    articles.forEach(article => {
      if(article.category == category)
      {
        article.id = article._id
        data.push(article)
      }
    })
    res.status(200).json({
      data: data
    })
  })
})
router.post('/add_article',function (req, res, next) {
  var article = {}
  article.title = req.body.title
  article.subtitle = req.body.subtitle
  article.time = req.body.time
  article.category = req.body.category
  article.status = req.body.status
  article.cover = req.body.cover
  article.content = req.body.content
  articles.insertArticle(article).then(result => {
    if(result.insertedIds) {
      res.status(200).send('1')
    }
  })
})
router.get('/get_article', function (req ,res ,next) {
  var id = req.param('id')
  articles.getArticle(id).then(article => {
  res.status(200).send(article[0])
})
})
router.post('/update_article', function (req, res, next) {
  var article = {}
  article.id = req.body.id
  article.title = req.body.title
  article.subtitle = req.body.subtitle
  article.time = req.body.time
  article.category = req.body.category
  article.status = req.body.status
  article.cover = req.body.cover
  article.content = req.body.content
  articles.updateArticle(article).then(result => {
    if(result) {
      res.status(200).send('1')
    }
  })
})
router.get('/cancel_top', function (req, res, next) {
  var id = req.param('id')
  var article = {}
  article.id = id
  article.status = 'published'
  articles.updateArticle(article).then(result => {
    if(result) {
      res.send('1')
    }
  })
})
router.get('/set_top', function (req, res, next) {
  var id = req.param('id')
  var article = {}
  article.id = id
  article.status = 'top'
  articles.updateArticle(article).then(result => {
    if(result) {
      res.send('1')
    }
  })
})
router.get('/publish_article', function (req, res, next) {
  var id = req.param('id')
  var article = {}
  article.id = id
  article.status = 'published'
  articles.updateArticle(article).then(result => {
    if(result) {
      res.send('1')
    }
  })
})
router.get('/draft_article', function (req, res, next) {
  var id = req.param('id')
  var article = {}
  article.id = id
  article.status = 'draft'
  articles.updateArticle(article).then(result => {
    if(result) {
      res.send('1')
    }
  })
})
router.get('/delete_article', function (req, res, next) {
  var id = req.param('id')
  var article = {}
  article.id = id
  article.status = 'deleted'
  articles.updateArticle(article).then(result => {
    if(result) {
      res.send('1')
    }
  })
})
module.exports = router
