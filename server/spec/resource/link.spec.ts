import { Link } from '../../app/resource';


describe('resource', () => {
  describe('Link', () => {
    
    it('should contain correct structure', () => {
      let link = new Link('self', 'http://localhost');

      expect(link['self']).toBeDefined()
      expect(link['self']).toEqual({href: 'http://localhost'})
    })
  })
})
