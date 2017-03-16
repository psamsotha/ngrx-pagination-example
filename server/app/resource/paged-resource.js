let AbstractResource = require('./abstract-resource')
let Link = require('./link')
let _extends = require('./extends')


/**
 * Represents a paged resource
 */
_extends(PagedResource, AbstractResource)
function PagedResource(data, collectionName) {
  AbstractResource.call(this)
  this._embedded = {}
  this._embedded[collectionName] = data
  this.page = {}
}

/**
 * Set the page data. `page` should be in the format
 * 
 * {
 *   number: 6,
 *   size: 5,
 *   totalPages: 20,
 *   totalElements: 100
 * }
 */
PagedResource.prototype.setPage = function (page) {
  if ( typeof page.number === 'undefined' 
    || typeof page.size === 'undefined'
    || typeof page.totalElements === 'undefined'
    || typeof page.totalElements === 'undefined') {
    throw new Error('page must be in the format {page, size, totalPages, totalElements}')
  }
  this.page = page
  return this
}

/**
 * Adds a "next" link.
 */
PagedResource.prototype.addNextLink = function (href) {
  this.addLink(Link.REL_NEXT, href)
  return this
}

/**
 * Adds a "prev" link.
 */
PagedResource.prototype.addPrevLink = function (href) {
  this.addLink(Link.REL_PREV, href)
  return this
}

/**
 * Adds a "first" link
 */
PagedResource.prototype.addFirstLink = function (href) {
  this.addLink(Link.REL_FIRST, href)
  return this
}

/**
 * Adds a "last" link
 */
PagedResource.prototype.addLastLink = function (href) {
  this.addLink(Link.REL_LAST, href)
  return this
}


module.exports = PagedResource
