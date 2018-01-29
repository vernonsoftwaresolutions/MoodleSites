'use strict'
const assert = require('chai').assert
const mockery = require('mockery')
const Guid = require('guid')

describe('Site service tests', function() {
    let createSite;
    let accountId = "ACCOUNTGUID"
    let requestSite = {}
    let sites = [
        {
            "siteId": {
                "S": "3831fcc9-bde6-c891-020a-68c69b14c5f1"
            },
            "accountId": {
                "S": "0tu6g0w7odxjd6e5kcjnkzw7b9"
            },
            "email": {
                "S": "6095226633464246@me.com"
            },
            "url": {
                "S": "http://www.google.com"
            },
            "creationTimestamp": {
                "N": "1515359364102"
            }
        },
        {
            "siteId": {
                "S": "deb7eb50-e10d-828a-726c-3b78186650fa"
            },
            "accountId": {
                "S": "0tu6g0w7odxjd6e5kcjnkzw7b9"
            },
            "email": {
                "S": "6095226633464246@me.com"
            },
            "url": {
                "S": "http://www.google.com"
            },
            "creationTimestamp": {
                "N": "1515359377712"
            }
        }
    ]
    let stacks = [
        {
            "stackName": "3831fcc9-bde6-c891-020a-68c69b14c5f1",
            "url": "era5hd08wl3qmqg8gb40lik9.vpc-c7aa77be",
            "status": "CREATE_IN_PROGRESS",
            "creationTime": 1515561660972
        },
        {
            "stackName": "deb7eb50-e10d-828a-726c-3b78186650fa",
            "url": "rj3lb8x3vrt3xr.vpc-c7aa77be",
            "status": "CREATE_IN_PROGRESS",
            "creationTime": 1515561520497
        }
    ]
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
                assert.equal(site.accountId, accountId);
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
                    return Promise.resolve(sites);
                }
            });   
            mockery.registerMock('../client/moodlestackclient', (aid) => {
                    assert.equal(aid, accountId);
                    return Promise.resolve(stacks);
            });  
            mockery.registerMock('../util/SiteStatusMapper', {
                map: (stks, sts) => {
                    assert.deepEqual(stks, stacks);
                    assert.deepEqual(sts, sites);
                    
                    return Promise.resolve(sts);
                }
            });   
            getAll = require('../../service/siteservice').getAll
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with okay', function(done) {
            getAll(accountId).then(data =>{

                assert.deepEqual(data,sites)
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
        
        it('respond with error', function(done) {
            getAll(accountId).catch(err =>{
                assert.equal(err.message,"Error retrieving sites")
                done()
            })
        });      
    }) 
    describe('stacks retrieval returns error', function() {
        let getAll;
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                getAll: (accountId) => {
                    assert.equal(accountId, accountId);
                    return Promise.resolve(sites);
                }
            });   
            mockery.registerMock('../client/moodlestackclient', (aid) => {
                    assert.equal(aid, accountId);
                    return Promise.reject("error");
                });           
            getAll = require('../../service/siteservice').getAll
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with error', function(done) {
            getAll(accountId).catch(err =>{
                assert.equal(err.message,"Error retrieving stacks")
                done()
            })
        });      
    }) 
    describe('Sites deletion successful', function() {
        let deleteSite;
        let aid = "ACCOUNT"
        let sid = "SITE"
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                delete: (accountId, siteId) => {
                    assert.equal(accountId, aid);
                    assert.equal(siteId, sid);
                    return Promise.resolve("OKAY");
                }
            });   
            mockery.registerMock('../client/deletesiteclient', (siteId) => {
                    assert.equal(siteId, sid);
                    return Promise.resolve("OKAY");
            });  
            deleteSite = require('../../service/siteservice').deleteSite
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with okay', function(done) {
            deleteSite(aid, sid).then(data =>{

                assert.deepEqual(data,"Ok")
                done()
            })
        });      
    }) 
    describe('Sites dynamo delete successful, web service fail', function() {
        let deleteSite;
        let aid = "ACCOUNT"
        let sid = "SITE"
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                delete: (accountId, siteId) => {
                    assert.equal(accountId, aid);
                    assert.equal(siteId, sid);
                    return Promise.resolve("OKAY");
                }
            });   
            mockery.registerMock('../client/deletesiteclient', (siteId) => {
                    assert.equal(siteId, sid);
                    return Promise.reject();
            });  
            deleteSite = require('../../service/siteservice').deleteSite
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with error object', function(done) {
            deleteSite(aid, sid).catch(err =>{

                assert.deepEqual(err.message,"Error calling delete service")
                done()
            })
        });      
    })
    describe('Sites dynamo delete fail', function() {
        let deleteSite;
        let aid = "ACCOUNT"
        let sid = "SITE"
        beforeEach(() => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true,
            });
            mockery.registerMock('../model/site', {
                delete: (accountId, siteId) => {
                    assert.equal(accountId, aid);
                    assert.equal(siteId, sid);
                    return Promise.reject();
                }
            });   
            deleteSite = require('../../service/siteservice').deleteSite
        })
        afterEach(() => {
            mockery.disable();
        });
        
        it('respond with error object', function(done) {
            deleteSite(aid, sid).catch(err =>{

                assert.deepEqual(err.message,"Error deleting site")
                done()
            })
        });      
    })
})