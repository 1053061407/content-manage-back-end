const Mongo = require('./db')
var objectId = require('mongodb').ObjectID
class Article {
  constructor(options = {}) {
    this.mongo = new Mongo()
    const {page, industry} = options
    this.options = {
      page,
      industry
    }
  }
  // 获得所有文章
  getArticles() {
    this.collection = this.mongo.getCollection('article');
    var articles
    articles = this.collection.find({}).toArray()
    return articles;
  }
  // 根据id获取一篇文章
  getArticle(id) {
    this.collection = this.mongo.getCollection('article')
    var _id = new objectId(id)
    var article = this.collection.find({ _id: _id }).toArray()

    return article
  }
  insertArticle(article) {
    this.collection = this.mongo.getCollection('article');
    return this.collection.insert(article)
  }
  updateArticle(article) {
    this.collection = this.mongo.getCollection('article')
    var _id = new objectId(article.id)
    return this.collection.update({ _id: _id }, {$set:article})
  }
}
module.exports = Article
