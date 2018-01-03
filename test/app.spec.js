'use strict'

const app = require('../app')
const request = require('supertest')
const expect = require('chai').expect
const fetchMock = require('fetch-mock')
const AWS = require('aws-sdk-mock')

const postUrl = "http://localhost:9001/dev/moodle/tenants"
//setup mockery's mock server



describe('GET /accounts/10/sites', function() {
    
    it('respond with json', function() {
      return request(app)
        .get('/accounts/10/sites')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
            expect(response.statusCode).to.eq(200)
            
        })
    });
});

describe('POST /accounts/someguid/sites', function() {
    beforeEach(() => {
        let requestBody = {
            accountId: 10,
            siteId: 11
        }
        AWS.mock('DynamoDB', 'putItem', function (params, callback) {
            callback(null,{ message: "okay" });
          });
        
        fetchMock.mock("http://api.vssdevelopment.com/dev/moodle/tenants", {
            body: JSON.stringify({messageId: "somemessageid"}),
            status: 202,
        });
    
    });
    afterEach(() => {
        fetchMock.restore()
        AWS.restore('DynamoDB')          
        
        
    });
    // it('respond with json', function() {
    //   return request(app)
    //     .post('/accounts/someguid/sites')
    //     .set('Accept', 'application/json')
    //     .expect(201)
    //     .then(response => {
    //         expect(response.statusCode).to.eq(201)
    //         expect(response.body.accountId).to.eq("someguid")
    //         expect(response.body.siteId).to.be.a('string')
            
    //     })
    // });
});