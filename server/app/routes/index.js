
let cleanMetadata = require('../util').cleanMetadata
let addUserToPost = require('../util').addUserToPost
let pagedResourceHandler = require('./paged-resource-handler')
let singleResourceHandler = require('./single-resource-handler')



module.exports.configure = function (app) {
  if (!app.get('db')) {
    throw new Error('db property is not set on app. Make sure' +
      ' there is one set and that it is set before configuring the routes')
  }
  let db = app.get('db')

  app.param('id', function (req, res, next, id) {
    req.id = id
    return next()
  })

  app.get('/api/users', pagedResourceHandler(app, 'users'))
  app.get('/api/posts', pagedResourceHandler(app, 'posts', postsTransformer))
  app.get('/api/users/:id', singleResourceHandler(app, 'users'))
  app.get('/api/posts/:id', singleResourceHandler(app, 'posts', postTransformer))

}

function postTransformer(postResource, req, app) {
  let users = app.get('db').getCollection('users')
  let user = users.by('id', postResource.authorId)
  let baseUrl = app.get('baseUrl')

  addUserToPost(postResource, user, baseUrl)
}

function postsTransformer(postsResource, req, app) {
  let users = app.get('db').getCollection('users')
  let posts = postsResource._embedded.posts
  let baseUrl = app.get('baseUrl')

  posts.forEach(function (post) {
    let user = users.by('id', post.authorId)
    addUserToPost(post, user, baseUrl)
  })
}
