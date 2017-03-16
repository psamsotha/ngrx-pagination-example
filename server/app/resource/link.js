

/**
 * Represents a hypermedia link.
 * 
 * @param {*} rel the relation name
 * @param {*} href the URL
 */
function Link(rel, href) {
  return {
    [rel]: { href: href }
  }
}
Link.REL_SELF = 'self'
Link.REL_NEXT = 'next'
Link.REL_PREV = 'prev'
Link.REL_LAST = 'last'
Link.REL_FIRST = 'first'


module.exports = Link
