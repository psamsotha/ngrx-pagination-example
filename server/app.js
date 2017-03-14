let loki = require('lokijs')
let generator = require('./generator')


let db = new loki('example.db')

let users = db.addCollection('users')
let posts = db.addCollection('posts')

generator.generateUsers(users)
generator.generatePosts(posts)

print(users.find())
print(posts.find())


function print(obj) {
  console.log(JSON.stringify(obj, null, 2))
}