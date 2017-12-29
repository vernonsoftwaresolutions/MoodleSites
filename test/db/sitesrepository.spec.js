const expect = require('chai').expect
const createSite = require('../../db/sitesrepository')
const AWS = require('aws-sdk-mock')
const Guid = require('guid')
AWS.Promise = Promise.Promise        

describe('sites repository', () => {
    let accountId =  "10"
    
    let site = {
        accountId: accountId,
        siteId: Guid.create().value
    }

    let item= {
        accountId: {
            S: accountId
          },
        siteId: {
            S: site.siteId
          } 
    }

    describe('createSite good request', () => {

        
        beforeEach(() => {
            AWS.mock('DynamoDB', 'putItem', function (params, callback) {
                callback(null,{ message: "okay" });
              });
        })
        afterEach(()=>{
            AWS.restore('DynamoDB');              
        })
        

        it('returns message', (done) => {
            createSite(site)
            .then(res => {
                expect(res.message).to.eq("okay")
                done()
            })
        })            
    })
    describe('createSite returns error', () => {
        
                
        beforeEach(() => {
            AWS.mock('DynamoDB', 'putItem', function (params, callback) {
                callback({ message: "error" });
                });
        })
        afterEach(()=>{
            AWS.restore('DynamoDB');              
        })
        

        it('returns error', (done) => {
            createSite(site)
            .catch(res => {
                expect(res.message).to.eq("error")
                done()
            })
        })            
    })
})