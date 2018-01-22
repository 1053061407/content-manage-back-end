const Mongo = require('./db')
class User {
  constructor(options = {}) {
    this.mongo = new Mongo()
    const {username, password } = options
    this.user = {
      username,
      password
    }
  }
  getUsers() {
    if (this.collection) {
      const users = this.collection.find({}).toArray();
      return users;
    }
    this.collection = this.mongo.getCollection('user');
    const users = this.collection.find({}).toArray();
    console.log(users)
    return users;
  }
}
module.exports = User