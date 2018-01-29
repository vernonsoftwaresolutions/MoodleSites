'use strict'

const fetch = require('node-fetch')
const winston = require('winston')
const getConfigByKey = require('../config/config');

//Method to POST to SiteCreation
const initializeSiteDeletion = function(siteId){
    let url = getConfigByKey('DELETE_STACKS').replace(':stackId', siteId)
    winston.info('about to make DELETE request to ', url, " with siteId ", stackId)
    //POST to SiteCreation resource
    return new Promise((resolve, reject)=> {
        fetch(url, { method: 'DELETE', body: {} })
        .then(res => {
            if(!res.ok){
                winston.error("Received invalid response code ", res.status)
                reject(new Error("Service Unavailable"))
            }
            winston.debug("Returned response ", res)
            return resolve(res.json());
        })
        .catch(err=>{
            winston.error("Error sending request to DELETE site service ", err)
            return reject(err);
        })
    })
}
module.exports = initializeSiteDeletion;