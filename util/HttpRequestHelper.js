'use strict'

const winston = require('winston')
const getConfigByKey = require('../config/config');

exports.createTenantRequest = function(site){
    winston.debug("about to convert ", site, " to MoodleTenantRequest")
    let request = {
        accountId: site.accountId,
        siteId: site.siteId,
        stackName: getConfigByKey('STACK_NAME'),
        siteName: site.siteId,
        vpcId: getConfigByKey('VPC_ID'),
        hostedZoneName: getConfigByKey('HOSTED_NAME'),
        priority: Math.floor(Math.random() * 100)
        
    }
    winston.info("created request ", request)
    
    return request
}