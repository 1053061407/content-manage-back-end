const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/contentManage';

class Mongo {
  constructor() {
    this.db = null
    // 标志数据库是否处于正在连接中，避免多次连接
    this.connecting = false
    this.url = url
    // 连接数据库
    this.connect().catch((err) => {
      console.log(err)
  });
  }

  // 连接数据库
  async connect() {
    // 如果数据库正在连接中则返回
    if (this.connecting) {
      return
    }
    if (this.db) {
      return Promise.resolve(this.db)
    }
    // 标志正在连接中
    this.connecting = true
    MongoClient.connect(this.url).then((db) => {
    console.log('数据库连接成功')
    this.connecting = false
    this.db = db
    return this.db
  }).catch((err) => {
      console.log(err)
  })
  }

  // 断开链接
  disconnect() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  // 获取集合
  getCollection(name, index = '_id') {
    // 当前集合与需要查询的集合一致
    if (this.collection && this.collection.s.name === name) {
      return this.collection;
    }
    if (this.db) {
      this.collection = this.db.collection(name);
      return this.collection;
    }
    // 连接数据库
    const db = this.connect();
    this.db = db;
    this.collection = this.db.collection(name);
    this.collection.createIndex({ [index]: 1 });
    return this.collection;
  }
}



// 数据库实例
module.exports = Mongo;