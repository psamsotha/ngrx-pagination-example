

module.exports = {
  idParamFactory: idParamFactory
}


function idParamFactory(collectionName, reqProperty, app) {

  let db = app.get('db')
  let collection = db.getCollection(collectionName)
  if (!collection) {
    throw new Error('No collection by the name: ' + collctionName)
  }

  return function(req, res, next, id) {
    let item = collection.by('id', id)
    if (!item) {
      return res.status(404).end()
    }
    req[reqProperty] = item;
    return next()
  }
}
