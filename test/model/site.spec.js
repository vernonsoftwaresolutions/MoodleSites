'use strict'
const assert = require('chai').assert
const mockery = require('mockery')
const Guid = require('guid')

describe('Site model tests', function() {
    let Site;
    let aid = "accountGuid"
    //some object
    let site = {
        accountId: aid,
        siteId: Guid.create().value
    }

 
    describe('Site create', function() {
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../db/sitesrepository', 
                 (site) => {
                    console.log("here")
                    assert.equal(site.accountId, aid);
                    return Promise.resolve(site);
                });            
            Site = require('../../model/site')
        })
        afterEach(() => {
            mockery.disable();
        });

        
        it('respond with json', function(done) {
            Site.create(site).then(data =>{
                assert.equal(site, data)
                done()
            })
        });      

    });   
    describe('Site getAll', function() {
        
        it('respond with json', function() {
            assert(Site.getAll(aid), [{
                "accountId": 1,
                "siteId": 2,
            }])
        });      
     
    });        
});