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
            mockery.registerMock('../db/sitesrepository', {
                createSite: (site) => {
                    console.log("here")
                    assert.equal(site.accountId, aid);
                    return Promise.resolve(site);
                }  
            })        
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
        let aid = "someid"
        let result = [{ accountId: aid, siteId: "someid" }];
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../db/sitesrepository', {
                getSites: (accountId) => {
                    assert.equal(accountId, aid);
                    return Promise.resolve(result);
                }  
            })        
            Site = require('../../model/site')
        })
        afterEach(() => {
            mockery.disable();
        });
        it('Returns array', function() {

            Site.getAll(aid).then(res => {
                assert.deepEqual(res, result)
            })
        });      
     
    });   
    describe('Site deleteAll', function() {
        let aid = "someid"
        let sid= "otherId"
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../db/sitesrepository', {
                deleteSite: (accountId, siteId) => {
                    assert.equal(accountId, aid);
                    assert.equal(siteId, sid);

                    return Promise.resolve("OK");
                }  
            })        
            Site = require('../../model/site')
        })
        afterEach(() => {
            mockery.disable();
        });
        it('Returns Okay', function() {

            Site.delete(aid, sid).then(res => {
                assert.equal(res, "OK")
            })
        });      
     
    });         
});