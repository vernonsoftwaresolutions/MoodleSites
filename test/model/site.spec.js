'use strict'
const assert = require('chai').assert
let Site = require('../../model/site')

describe('Site model tests', function() {
    let accountId = 10;
    describe('Site getAll', function() {

        it('respond with json', function() {
            assert(Site.getAll(accountId), [{
                "accountId": 1,
                "siteId": 2,
            }])
        });      

    });    
    describe('Site create', function() {
        
        it('respond with json', function() {
            assert(Site.getAll(accountId),  {
                "siteId": 2,
            })
        });      

    });        
});