  
  module.exports = addSelfLink

  
  function addSelfLink(resource, req, baseUrl, strip) {
    let path = strip ? stripQuery(req.originalUrl) : req.originalUrl
    resource.addSelfLink(baseUrl + normalizePath(path))
  }

  function stripQuery(url) {
    if (url.indexOf('?') !== -1) {
      return url.substr(0, url.indexOf('?'))
    }
    return url
  }

  function normalizePath(path) {
    if (!path.startsWith('/')) {
      return '/' + path
    }
    return path
  }