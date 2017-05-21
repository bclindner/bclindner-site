var request = require('superagent')
var should = require('chai').should()
describe('Blog API', () => {
  var server
  before((done) => {
    server = require('../server.js')
    done()
  })
  after(() => {
    server.close()
  })
  it('returns /blog/page/1', (done) => {
    request(server)
      .get('/blog/page/1')
      .expect(200, done)
  })
})
