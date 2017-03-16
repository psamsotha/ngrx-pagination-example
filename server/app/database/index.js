let loki = require('lokijs')
let generator = require('./generator.js')


module.exports.configure = (app) => {
  let db = new loki('example.db')

  let users = db.addCollection('users', { unique: ['id'] })
  let posts = db.addCollection('posts', { unique: ['id'] })

  generator.generateUsers(users)
  generator.generatePosts(posts)

  app.set('db', db)
}
