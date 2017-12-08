'use strict'

// Get all sites by accountId
exports.getAll = function(accountId) {
    return [{
        "accountId": 1,
        "siteId": 2,
    }]
}

// Get all sites by accountId
exports.create = function(accountId) {
    return {
        "siteId": 2,
    }
}
  