'use strict'

const fetch = require('node-fetch')
const winston = require('winston')
const getConfigByKey = require('../config/config');

const getStacksByAccountId = function(accountId){
    let url = getConfigByKey('GET_STACKS')
    winston.info('about to make request to ', url, " with accountId ", accountId)
    
    return new Promise((resolve, reject)=> {
        fetch(url)
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

module.exports = getStacksByAccountId;