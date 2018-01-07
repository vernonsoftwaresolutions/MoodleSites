'use strict'
const assert = require('chai').assert
const mockery = require('mockery')
const Guid = require('guid')

describe('Site service tests', function() {
    let createSite;
    let accountId = "ACCOUNTGUID"
    let requestSite = {}

    describe('Site creation successful', function() {
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                 create: (site) => {
                    console.log("here")
                    assert.equal(site.accountId, accountId);
                    console.log("after")
                    return Promise.resolve("Okay");
                }
            });  
            mockery.registerMock('../client/siteclient', (site) => {
                console.log("here")
                assert.equal(site.accountId, accountId);
                console.log("after this")
                return Promise.resolve({messageId:"Okay"});
            });            
            createSite = require('../../service/siteservice').createSite
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with okay', function(done) {
            createSite(accountId, requestSite).then(data =>{
                console.log(data)
                assert.equal(data.accountId,accountId)
                done()
            })
        });      
    })     
    describe('Site persistence failure', function() {
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                 create: (site) => {
                    console.log("here")
                    assert.equal(site.accountId, accountId);
                    console.log("after")
                    return Promise.reject("Error");
                }
            });            
            createSite = require('../../service/siteservice').createSite
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with error', function(done) {
            createSite(accountId, requestSite).catch(err =>{
                assert.equal(err.message,"Error storing site")
                done()
            })
        });      
    })     
    describe('Site persisted, site initialization failed', function() {
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                 create: (site) => {
                    console.log("here")
                    assert.equal(site.accountId, accountId);
                    console.log("after")
                    return Promise.resolve("Okay");
                }
            });  
            mockery.registerMock('../client/siteclient', 
                (site) => {
                   console.log("here")
                   assert.equal(site.accountId, accountId);
                   console.log("after this")
                   return Promise.reject({messageId:"Okay"});
               }
            );            
            createSite = require('../../service/siteservice').createSite
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with error', function(done) {
            createSite(accountId, requestSite).catch(err =>{
                assert.equal(err.message,"Error creating site")
                done()
            })
        });      
    })    
    describe('Sites retrieval successful', function() {
        let getAll;
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                getAll: (accountId) => {
                    assert.equal(accountId, accountId);
                    return Promise.resolve("Okay");
                }
            });            
            getAll = require('../../service/siteservice').getAll
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with okay', function(done) {
            getAll(accountId).then(data =>{

                assert.equal(data,"Okay")
                done()
            })
        });      
    }) 
    describe('Sites retrieval returns error', function() {
        let getAll;
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                getAll: (accountId) => {
                    assert.equal(accountId, accountId);
                    return Promise.reject("error");
                }
            });            
            getAll = require('../../service/siteservice').getAll
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with okay', function(done) {
            getAll(accountId).catch(err =>{
                assert.equal(err.message,"Error retrieving sites")
                done()
            })
        });      
    }) 
})