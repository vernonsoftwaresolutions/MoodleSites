'use strict'
const winston = require('winston')
const createSite = require('../db/sitesrepository')

// Get all sites by accountId
exports.getAll = function(accountId) {
    return [{
        "accountId": 1,
        "siteId": 2,
    }]
}

//todo-add validation
// Create a site
exports.create = function(site) {
    winston.debug("about to create site ", site)
    return createSite(site).then(res =>{
        winston.debug("created site ", res)
        return res        
    })
}


  