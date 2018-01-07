'use strict'

const expect = require('chai').expect
const repository = require('../../db/sitesrepository')
const AWS = require('aws-sdk-mock')
const Guid = require('guid')
AWS.Promise = Promise.Promise        

describe('sites repository', () => {


    describe('createSite good request', () => {

        let accountId =  "10"
        
        let site = {
            accountId: accountId,
            siteId: Guid.create().value,
            email: "email",
            url: "url",
            creationTimestamp: Date.now()

        }
    
        let item= {
            accountId: {
                S: accountId
              },
            siteId: {
                S: site.siteId
              },
            email: {
                S: site.email
            },
            url: {
                S: site.url
            },
            creationTimestamp: {
                N: site.creationTimestamp.toString()
            }  
        }
        
        beforeEach(() => {
            AWS.mock('DynamoDB', 'putItem', function (params, callback) {
                callback(null,{ message: "okay" });
              });
        })
        afterEach(()=>{
            AWS.restore('DynamoDB');              
        })
        

        it('returns message', (done) => {
            repository.createSite(site)
            .then(res => {
                expect(res.message).to.eq("okay")
                done()
            })
        })            
    })
    describe('createSite returns error', () => {
        let accountId =  "10"
        
        let site = {
            accountId: accountId,
            siteId: Guid.create().value,
            email: "email",
            url: "url",
            creationTimestamp: Date.now()

        }
    
        let item= {
            accountId: {
                S: accountId
              },
            siteId: {
                S: site.siteId
              } 
        }
                
        beforeEach(() => {
            AWS.mock('DynamoDB', 'putItem', function (params, callback) {
                callback({ message: "error" });
                });
        })
        afterEach(()=>{
            AWS.restore('DynamoDB');              
        })
        

        it('returns error', (done) => {
            repository.createSite(site)
            .catch(res => {
                expect(res.message).to.eq("error")
                done()
            })
        })            
    })
    describe('getSites good request', () => {
        
        let accountId =  "10"
    
        beforeEach(() => {
            AWS.mock('DynamoDB', 'query', function (params, callback) {
                callback(null,{Items:[{ accountId: "10", siteId: "someid" }]});
                });
        })
        afterEach(()=>{
            AWS.restore('DynamoDB');              
        })
        

        it('returns data', (done) => {
            repository.getSites(accountId)
            .then(data => {
                expect(data.length).to.eq(1)
                expect(data[0].accountId).to.eq("10")
                expect(data[0].siteId).to.eq("someid")
                
                done()
            })
        })            
    })
    describe('getSites bad request', () => {
        
        let accountId =  "10"
    
        beforeEach(() => {
            AWS.mock('DynamoDB', 'query', function (params, callback) {
                callback({error:"error"});
                });
        })
        afterEach(()=>{
            AWS.restore('DynamoDB');              
        })
        

        it('returns data', (done) => {
            repository.getSites(accountId)
            .catch(err => {
                expect(err.error).to.eq("error")
                
                done()
            })
        })            
    })
})