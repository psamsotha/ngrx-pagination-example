/*
let cleanMetadata = require('../../app/util').cleanMetadata


describe('util', () => {
  describe('cleanMetadata', () => {

    it('should clean clean metadata', () => {
      let data = {
        name: 'user',
        age: 30,
        meta: {
          data: 'data'
        },
        ['$loki']: 100
      }

      let cleaned = cleanMetadata(data)

      expect(cleaned.name).toEqual('user')
      expect(cleaned.age).toEqual(30)
      expect(cleaned.meta).toBeUndefined()
      expect(cleaned['$loki']).toBeUndefined()
    })
  })
})
*/