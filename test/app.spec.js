'use strict'

const app = require('../app')
const request = require('supertest')
const assert = require('chai').assert

describe('GET /accounts/10/sites', function() {
    it('respond with json', function() {
      return request(app)
        .get('/accounts/10/sites')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
            assert(response.body[0].accountId, 1)
            assert(response.body[0].siteId, 2)
            
        })
    });
});

describe('POST /accounts/10/sites', function() {
    it('respond with json', function() {
      return request(app)
        .post('/accounts/10/sites')
        .set('Accept', 'application/json')
        .expect(201)
        .then(response => {
            assert(response.body.siteId, 2)
            
        })
    });
});