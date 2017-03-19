import { AbstractResource } from '../../resource';


class DummyResource extends AbstractResource {}


describe('resource', () => {
  describe('AbstractResource', () => {
    let resource: AbstractResource;

    beforeEach(() => {
      resource = new DummyResource();
    });
    
    it('should add a link', () => {
      resource.addLink('self', 'http://localhost')

      expect(resource._links).toBeDefined()
      expect(resource._links.self).toEqual({href: 'http://localhost'})

      resource.addLink('next', 'http://localhost/1')

      expect(resource._links.self).toEqual({href: 'http://localhost'})
      expect(resource._links.next).toEqual({href: 'http://localhost/1'})
    });

    it('should add a "self" link', () => {
      resource.addSelfLink('http://localhost')

      expect(resource._links.self).toEqual({href: 'http://localhost'})
    });
  });
});
