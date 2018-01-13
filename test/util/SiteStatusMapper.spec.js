'use strict'

const assert = require('chai').assert
const mapper = require('../../util/SiteStatusMapper.js')

describe('SiteStatusMapper tests', function() {
    let sites = [
        {
            "siteName": {
                "S": "sitename050840609309237283"
            },
            "siteId": {
                "S": "f89c42fb-e011-fbe1-cd09-4991395c9f6e"
            },
            "accountId": {
                "S": "z2kwcrku55pn27mhc7u1bgldi"
            },
            "email": {
                "S": "5958829155134366@me.com"
            },
            "url": {
                "S": "http://www.google.com"
            },
            "creationTimestamp": {
                "N": "1515653801329"
            }
        },
        {
            "siteName": {
                "S": "sitenameanother"
            },
            "siteId": {
                "S": "f89c42fb-e011-fbe1-cd09-4991395c9f6e"
            },
            "accountId": {
                "S": "z2kwcrku55pn27mhc7u1bgldi"
            },
            "email": {
                "S": "5958829155134366@me.com"
            },
            "url": {
                "S": "http://www.google.com"
            },
            "creationTimestamp": {
                "N": "1515653801329"
            }
        }
    ]
    let stacks = [{
        "stackName": "f89c42fb-e011-fbe1-cd09-4991395c9f6e",
        "url": "sitename050840609309237283.vpc - c7aa77be",
        "status": "CREATE_IN_PROGRESS",
        "creationTime": 1515653807371
    }, {
        "stackName": "f89c42fb-e011-fbe1-cd09-4991395c9f6e",
        "url": "randomSiteName.vpc - c7aa77be",
        "status": "CREATE_IN_PROGRESS",
        "creationTime": 1515653600312
    }]

    let missedStacks = [
        {
            "stackName": "totalMiss",
            "url": "era5hd08wl3qmqg8gb40lik9.vpc-c7aa77be",
            "status": "CREATE_IN_PROGRESS",
            "creationTime": 1515561660972
        },
        {
            "stackName": "not even close",
            "url": "rj3lb8x3vrt3xr.vpc-c7aa77be",
            "status": "CREATE_IN_PROGRESS",
            "creationTime": 1515561520497
        }
    ]
   
    describe('Stack status mapped', function() {

        it('mapped status for 1st object', function() {
            let res = mapper.map(stacks, sites)
            
            assert.equal(res[0].status.S, "CREATE_IN_PROGRESS")
        })  
        it('mapped status for 2nd object', function() {
            let res = mapper.map(stacks, sites)
            
            assert.equal(res[1].status.S, "CREATE_IN_PROGRESS")
        })  
    })
    describe('Stack status mapped missed', function() {

        it('mapped status for 1st object N/A', function() {
            let result = mapper.map(missedStacks, sites)
            
            assert.equal(result[0].status.S, "N/A")
        })  
        it('mapped status for 2nd object N/A', function() {
            let result = mapper.map(missedStacks, sites)
            
            assert.equal(result[1].status.S, "N/A")
        })  
    })
})