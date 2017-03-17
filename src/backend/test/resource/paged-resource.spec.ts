import { AbstractResource, PagedResource } from '../../resource';


describe('resource', () => {
  describe('PagedResource', () => {
    let resource: PagedResource;

    beforeEach(() => {
      resource = new PagedResource([{ data: 'data' }], 'data')
    });

    it('should extend AbstractResource', () => {
      expect(resource.addLink).toBeDefined()
      expect(resource.addSelfLink).toBeDefined()
    });

    it('should have the correct structure', () => {
      expect(resource._embedded).toBeDefined()
      expect(resource._embedded.data).toBeDefined()
      expect(resource._embedded.data).toEqual([{ data: 'data' }])
    });

    it('should add page', () => {
      let page = { number: 0, size: 0, totalPages: 0, totalElements: 0 }
      resource.setPage(page)

      expect(resource.page).toEqual(page)
    });

    it('should add all link', () => {
      resource
        .addNextLink('http://localhost/next')
        .addPrevLink('http://localhost/prev')
        .addFirstLink('http://localhost/first')
        .addLastLink('http://localhost/last')

      expect(resource._links.next).toEqual({ href: 'http://localhost/next' })
      expect(resource._links.prev).toEqual({ href: 'http://localhost/prev' })
      expect(resource._links.first).toEqual({ href: 'http://localhost/first' })
      expect(resource._links.last).toEqual({ href: 'http://localhost/last' })
    });
  });
});
