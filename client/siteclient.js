'use strict'

const fetch = require('node-fetch')
const winston = require('winston')
const getConfigByKey = require('../config/config');

//Method to POST to SiteCreation
const initializeSiteCreation = function(site){
    let url = getConfigByKey('POST_CREATION')
    winston.info('about to make request to ', url, " with site ", site)
    //POST to SiteCreation resource
    return new Promise((resolve, reject)=> {
        fetch(url, { method: 'POST', body: JSON.stringify(site) })
        .then(res => {
            if(!res.ok){
                winston.error("Received invalid response code ", res.status)
                reject(new Error("Service Unavailable"))
            }
            winston.debug("Returned response ", res)
            return resolve(res.json());
        })
        .catch(err=>{
            winston.error("Error sending request to Post Creation service ", err)
            return reject(err);
        })
    })
}
module.exports = initializeSiteCreation;