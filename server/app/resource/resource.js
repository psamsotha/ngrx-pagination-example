let AbstractResource = require('./abstract-resource')
let _extends = require('./extends')

/**
 * Represents a single resource
 * 
 * @param data the resource data
 */
_extends(Resource, AbstractResource)
function Resource(data) {
  AbstractResource.call(this)
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      this[prop] = data[prop]
    }
  }
}


module.exports = Resource
