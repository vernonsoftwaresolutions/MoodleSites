// test-setup.spec.js
const chai = require('chai')
const fetchMock = require('fetch-mock')
const expect = require('chai').expect
const initializeSiteCreation = require('../../client/siteclient')

const postUrl = 'http://localhost:9001/dev/moodle/tenants';


describe('siteclient initializeSiteCreation', function () {
  //todo-fix these
  // it('saves the content', function(done) {
    
  //   let requestBody = {
  //     accountId: 10,
  //     siteId: 11
  //   }

  //   fetchMock.mock((url, opts) => {
  //         return url === postUrl && opts.body === JSON.stringify(requestBody);
  //     }, {
  //       body: JSON.stringify({messageId: "somemessageid"}),
  //       status: 202,
  //   });

  //   initializeSiteCreation(requestBody).then(res => {
  //     expect(res.messageId).to.equal("somemessageid")
  //     done()
  //   })
  // })    
});