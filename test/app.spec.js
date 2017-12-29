'use strict'

const app = require('../app')
const request = require('supertest')
const assert = require('chai').assert

const postUrl = "http://localhost:9001/dev/moodle/tenants"
//setup mockery's mock server



describe('GET /accounts/10/sites', function() {
    
    it('respond with json', function() {
      return request(app)
        .get('/accounts/10/sites')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
            assert(response, {})
            
        })
    });
});

describe('POST /accounts/10/sites', function() {
    // beforeEach(() => {
    //     let requestBody = {
    //         accountId: 10,
    //         siteId: 11
    //     }
        
    //     fetchMock.mock((url, opts) => {
    //         console.log("okay here")
    //         return url === postUrl && opts.body === JSON.stringify(requestBody);
    //     }, {
    //         body: JSON.stringify({messageId: "somemessageid"}),
    //         status: 202,
    //     });
    
    // });
    // afterEach(() => {
    //     fetchMock.restore()
        
    // });
    // it('respond with json', function() {
    //   return request(app)
    //     .post('/accounts/10/sites')
    //     .set('Accept', 'application/json')
    //     .expect(201)
    //     .then(response => {
    //         assert(response.body.siteId, 2)
            
    //     })
    // });
});