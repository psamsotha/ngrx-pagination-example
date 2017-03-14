let express = require('express')
let router = express.Router()


module.exports.configure = (app) => {
  if (!app.get('db')) {
    throw new Error('db property is not set on app. Make sure' + 
    ' there is one set and that it is set before configuring the routes')
  }

  let db = app.get('db')
  
  return {
    getUsers: getUsers,
    getUser: getUser
  }

  function getUsers(req, res) {
    let users = db.getCollection('users')

    return res.json(users.find())
  }

  function getUser(req, res) {
    return res.json(req.user)
  }
}
