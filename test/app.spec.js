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
            assert(response.body.aid, 10)
        })
    });
});

describe('POST /accounts/10/sites', function() {
    it('respond with json', function() {
      return request(app)
        .post('/accounts/10/sites')
        .set('Accept', 'application/json')
        .expect(201)
    });
});