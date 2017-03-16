

module.exports = cleanMetadata


function cleanMetadata(lokiData) {
  if(Object.prototype.toString.call(lokiData) === '[object Array]' ) {
    return lokiData.map(obj => {
      return cleanObject(obj)
    })
  }
  return cleanObject(lokiData)
}

function cleanObject(obj) {
  let result = Object.assign({}, obj)
  delete result['meta']
  delete result['$loki']
  return result
}
