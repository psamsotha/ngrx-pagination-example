let resources = require('../../app/resource')
let Link = resources.Link
let AbstractResource = resources.AbstractResource
let Resource = resources.Resource
let PagedResource = resources.PagedResource


describe('resource', () => {

  describe('Link', () => {
    it('should contain correct structure', () => {
      let link = new Link('self', 'http://localhost')

      expect(link.self).toBeDefined()
      expect(link.self).toEqual({href: 'http://localhost'})
    })
  })

  describe('AbstractResource', () => {
    let resource

    beforeEach(() => {
      resource = new AbstractResource()
    })
    
    it('should add a link', () => {
      resource.addLink('self', 'http://localhost')

      expect(resource._links).toBeDefined()
      expect(resource._links.self).toEqual({href: 'http://localhost'})

      resource.addLink('next', 'http://localhost/1')

      expect(resource._links.self).toEqual({href: 'http://localhost'})
      expect(resource._links.next).toEqual({href: 'http://localhost/1'})
    })

    it('should add a "self" link', () => {
      resource.addSelfLink('http://localhost')

      expect(resource._links.self).toEqual({href: 'http://localhost'})
    })
  })


  describe('Resource', () => {
    let resource

    beforeEach(() => {
      resource = new Resource({name: 'user', age: 30})
    })

    it('should extend AbstractResource', () => {
      expect(resource.addLink).toBeDefined()
      expect(resource.addSelfLink).toBeDefined()
    })

    it('should add properties', () => {
      expect(resource.name).toEqual('user')
      expect(resource.age).toEqual(30)
    })

    it('should add "self" link', () => {
      resource.addSelfLink('http://localhost/self')

      expect(resource._links.self).toBeDefined()
      expect(resource._links.self).toEqual({href: 'http://localhost/self'})
    })

    it('should stringify', () => {
      let json = JSON.stringify(resource)
      expect(json).toEqual('{"name":"user","age":30}')
    })
  })

  describe('PagedResource', () => {
    let resource

    beforeEach(() => {
      resource = new PagedResource([{data: 'data'}], 'data')
    })

    it('should extend AbstractResource', () => {
      expect(resource.addLink).toBeDefined()
      expect(resource.addSelfLink).toBeDefined()
    })

    it('should have the correct structure', () => {
      expect(resource._embedded).toBeDefined()
      expect(resource._embedded.data).toBeDefined()
      expect(resource._embedded.data).toEqual([{data: 'data'}])
    })

    it('should add page', () => {
      let page = {number: 0, size: 0, totalPages: 0, totalElements: 0}
      resource.setPage(page)

      expect(resource.page).toEqual(page)
    })

    it('should add all link', () => {
      resource
        .addNextLink('http://localhost/next')
        .addPrevLink('http://localhost/prev')
        .addFirstLink('http://localhost/first')
        .addLastLink('http://localhost/last')

      expect(resource._links.next).toEqual({href: 'http://localhost/next'})
      expect(resource._links.prev).toEqual({href: 'http://localhost/prev'})
      expect(resource._links.first).toEqual({href: 'http://localhost/first'})
      expect(resource._links.last).toEqual({href: 'http://localhost/last'})
    })
  })

})
