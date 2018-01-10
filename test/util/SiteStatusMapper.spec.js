'use strict'

const assert = require('chai').assert
const mapper = require('../../util/SiteStatusMapper.js')

describe('SiteStatusMapper tests', function() {
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
 
    describe('Stack status mapped', function() {
        let res = mapper.map(stacks, sites)
        console.log("res ", res)
        it('mapped status for 1st object', function() {
            assert.equal(res[0].status.S, "CREATE_IN_PROGRESS")
        })  
        it('mapped status for 2nd object', function() {
            assert.equal(res[1].status.S, "CREATE_IN_PROGRESS")
        })  
    })
})