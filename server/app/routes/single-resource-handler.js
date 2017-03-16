let Resource = require('../resource').Resource
let addSelfLink = require('../util/add-self-link')
let isArray = require('../util/is-array')
let cleanMetadata = require('../util/clean-metadata')


module.exports = singleResourceHandler


function singleResourceHandler(app, collectionName, transformers) {
  let db = app.get('db')
  let coll = db.getCollection(collectionName)
  let baseUrl = app.get('baseUrl')


  return function (req, res) {
    let id = req.id
    if (typeof id === 'undefined') {
      res.sendStatus(500)
    }
    let item = coll.by('id', id)

    let resource = new Resource(item)
    addSelfLink(resource, req, baseUrl, true)

    if (typeof transformers !== 'undefined') {
      if (isArray(transformers)) {
        transformers.forEach(function (transformer) {
          transformer(resource, req, app)
        })
      } else {
        transformers(resource, req, app)
      }
    }

    return res.json(cleanMetadata(resource))
  }
}