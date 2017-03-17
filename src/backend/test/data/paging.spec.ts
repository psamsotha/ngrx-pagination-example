import { Page, PageRequest, Sort } from '../../data';


describe('data', () => {

  describe('Page', () => {
    let page: Page<string>;

    beforeEach(() => {
      const request = new PageRequest(2, 2);

      page = new Page(['five', 'size'], request, 11);
    });

    it('should have size', () => {
      expect(page.size).toEqual(2);
    });

    it('shouls have totalElements', () => {
      expect(page.totalElements).toEqual(11);
    });

    it('should have totalPages', () => {
      expect(page.totalPages).toEqual(6);
    });

    it('should have page number', () => {
      expect(page.number).toEqual(2);
    });

    it('should have next', () => {
      expect(page.hasNext).toEqual(true);
    });

    it('should have prev', () => {
      expect(page.hasPrev).toEqual(true);
    });

    it('should have correct next page request', () => {
      const request = page.next;
      expect(request.page).toEqual(3);
      expect(request.size).toEqual(2);
    });

    it('should have correct prev page request', () => {
      const request = page.prev;
      expect(request.page).toEqual(1);
      expect(request.size).toEqual(2);
    });

    it('should have first page request', () => {
      const request = page.first;
      expect(request.page).toEqual(0);
      expect(request.size).toEqual(2);
    });

    it('should have last page request', () => {
      const request = page.last;
      expect(request.page).toEqual(5);
      expect(request.size).toEqual(1);
    });

    it('should not have next', () => {
      const request = new PageRequest(6, 2);
      page = new Page(['ten'], request, 11);

      expect(page.hasNext).toEqual(false);
      expect(page.next).toEqual(null);
    });

    it('should not have prev', () => {
      const request = new PageRequest(0, 2);
      page = new Page(['one', 'two'], request, 11);

      expect(page.hasPrev).toEqual(false);
      expect(page.prev).toEqual(null);
    });
  });
});

