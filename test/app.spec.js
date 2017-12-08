'use strict'

const app = require('../app')
const request = require('supertest')
const assert = require('chai').assert

describe('GET /users', function() {
    it('respond with json', function() {
      return request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
            assert(response.body.length, 2)
        })
    });
});

describe('POST /users', function() {
    it('respond with json', function() {
      return request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .expect(201)
    });
});