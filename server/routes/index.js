

module.exports.configure = function(app) {
  
  let middleware = require('../middleware')
  let users = require('./users.js').configure(app)

  app.param('userId', middleware.idParamFactory('users', 'user', app))

  app.get('/users', users.getUsers)
  app.get('/users/:userId', users.getUser)
}
