'use strict'
const initializeSiteCreation = require('../client/siteclient')
const Site = require('../model/site')
const Guid = require('guid')
const winston = require('winston')

const createSite = function(accountId){
    let site = {
        accountId: accountId,
        siteId: Guid.create().value
    }
    winston.info("attempting to create site with generated id ", site)
    console.log(Site)
    return new Promise((resolve, reject) => {
        Site.create(site)
        .then(data =>{
            winston.info("stored site in persistence, now attempting to initialize creation process")
            console.log(initializeSiteCreation)
            initializeSiteCreation(site)
            .then(res =>{
                winston.info("Initialization triggered successfully with response ", res)
                return resolve(site);
            })
            .catch(err=>{
                //todo- create error queue to handle this
                //todo- also create error handling schema
                winston.info("Error calling site client, placing error on error queue")
                reject(new Error("Error creating site"))
            })
        })
        .catch(err =>{
            //this is an error that should return an error response to the client
            winston.info("Error storing site")
            reject(new Error("Error storing site"))
        })

    })



}

module.exports = createSite;