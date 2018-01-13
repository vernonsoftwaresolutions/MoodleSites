'use strict'

const assert = require('chai').assert
const helper = require('../../util/HttpRequestHelper')
const Guid = require('guid')

describe('HttpRequestHelper tests', function() {
    let site = {
        accountId: "accountid",
        siteId: Guid.create().value,
        email: "email",
        url: "url",
        siteName: "siteName",
        creationTimestamp: Date.now()
    }
 
    describe('Site request created', function() {
        it('created request with accountId', function() {
            let req = helper.createTenantRequest(site)
            assert.equal(site.accountId, req.accountId)
        })  
        it('created request with siteId', function() {
            let req = helper.createTenantRequest(site)
            assert.equal(site.siteId, req.siteId)
        })  
        it('created request with vpcId', function() {
            let req = helper.createTenantRequest(site)
            console.log(req)
            assert.equal(req.vpcId, "VPC-Id")
        }) 
        it('created request with hostedZoneName:', function() {
            let req = helper.createTenantRequest(site)
            console.log(req)
            assert.equal(req.hostedZoneName, "hostedzone")
        }) 
        it('created request with stackname', function() {
            let req = helper.createTenantRequest(site)
            console.log(req)
            assert.equal(req.stackName, "stackname")
        }) 
        it('created request with siteName', function() {
            let req = helper.createTenantRequest(site)
            console.log(req)
            assert.equal(req.siteName, site.siteId)
        }) 
        it('created request with priority', function() {
            let req = helper.createTenantRequest(site)
            console.log(req)
            assert.equal(typeof req.priority, "number")
        })   
    })

})