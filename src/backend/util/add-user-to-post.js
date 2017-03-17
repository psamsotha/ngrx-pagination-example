let cleanMetadata = require('./clean-metadata')
let Resource = require('../resource').Resource

module.exports = addUserToPost


function addUserToPost(post, u, baseUrl) {
  let user = new Resource(cleanMetadata(u))
    .addSelfLink(baseUrl + '/users/' + u.id)

  delete user.location
  delete user.password
  delete user.email
  delete user.id
  delete user.name
  delete user.dateCreated

  post.user = user
  return post
}

