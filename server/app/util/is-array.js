

module.exports = isArray


function isArray(obj) {
  return Object.prototype.toString(obj) === '[object Array]'
}
