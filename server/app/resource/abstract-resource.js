let Link = require('./link')


/**
 * An abstract base class for resource types
 */
function AbstractResource() {
}

/**
 * Adds a `Link` to the resource
 */
AbstractResource.prototype.addLink = function(rel, href) {
  if (!this._links) {
    this._links = {};
  }
  this._links = Object.assign({}, this._links, new Link(rel, href))
  return this;
}

/**
 * Adds a "self" link to the resource
 */
AbstractResource.prototype.addSelfLink = function(href) {
  this.addLink(Link.REL_SELF, href)
  return this
}


module.exports = AbstractResource

