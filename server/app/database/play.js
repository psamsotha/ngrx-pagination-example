let express = require('express')
let app = express()
let database = require('./index')

database.configure(app)

let db = app.get('db')

let users = db.getCollection('users')
let posts = db.getCollection('posts')


let dv = posts.addDynamicView('test')
dv.applySimpleSort('dateCreated', true)
let data = dv.data().slice(0, 2).map(post => {
  let cleaned = Object.assign({}, post)
  delete cleaned['meta']
  delete cleaned['$loki']
  return cleaned
})

print(data)

function print(data) {
  console.log(JSON.stringify(data, null, 2))
}
