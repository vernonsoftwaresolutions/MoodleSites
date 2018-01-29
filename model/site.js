'use strict'
const winston = require('winston')
const repository = require('../db/sitesrepository')

// Get all sites by accountId
exports.getAll = function(accountId) {
    winston.debug("about to fetch sites for account ", accountId)

    return repository.getSites(accountId).then(res => {
        winston.debug("retrieved sites ", res)
        return res
    })
    
}

//todo-add validation
// Create a site
exports.create = function(site) {
    winston.debug("about to create site ", site)
    return repository.createSite(site).then(res =>{
        winston.debug("created site ", res)
        return res        
    })
}

//todo-add validation
// Create a site
exports.delete = function(accountId, siteId) {
    winston.debug("about to delete site ", siteId)
    return repository.deleteSite(accountId, siteId).then(res =>{
        winston.debug("created site ", res)
        return res        
    })
}

  