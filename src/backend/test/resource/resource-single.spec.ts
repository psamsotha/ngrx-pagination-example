import { AbstractResource, Resource } from '../../resource';


describe('resource', () => {
  describe('Resource', () => {
    let resource: Resource;

    beforeEach(() => {
      resource = new Resource({ name: 'user', age: 30 })
    })

    it('should extend AbstractResource', () => {
      expect(resource.addLink).toBeDefined()
      expect(resource.addSelfLink).toBeDefined()
    })

    it('should add properties', () => {
      expect(resource['name']).toEqual('user')
      expect(resource['age']).toEqual(30)
    })

    it('should add "self" link', () => {
      resource.addSelfLink('http://localhost/self')

      expect(resource._links.self).toBeDefined()
      expect(resource._links.self).toEqual({ href: 'http://localhost/self' })
    })

    it('should stringify', () => {
      let json = JSON.stringify(resource)
      expect(json).toEqual('{"name":"user","age":30}')
    })
  });
});