



/**
 * Helper to do inheritence.
 */
function _extends(subClass, superClass) {
  for (var prop in superClass) {
    if (superClass.hasOwnProperty(prop)) {
      subClass[prop] = superClass[prop]
    }
  }

  function F() {
    this.constructor = subClass
  }

  subClass.prototype = superClass === null
    ? Object.create(superClass)
    : (F.prototype = superClass.prototype, new F())
}


module.exports = _extends