'use strict'
const initializeSiteCreation = require('../client/siteclient')
const Site = require('../model/site')
const Guid = require('guid')
const winston = require('winston')

exports.getAll = function(accountId){
    winston.info("about to retrieve sites for accountId ", accountId)

    return new Promise((resolve, reject) => {
        Site.getAll(accountId).then(data => {
            winston.info("retrieved data ", data)
            return resolve(data)
        })
        .catch(err =>{
            //this is an error that should return an error response to the client
            winston.info("Error retrieving sites for account ", accountId, "with error ", err)
            return reject(new Error("Error retrieving sites"))
        })
    })
}    

exports.createSite = function(accountId, siteRequest){
    //create initial site object to be stored
    //todo- this needs to be refactored and moved to a model for validation
    let site = {
        accountId: accountId,
        siteId: Guid.create().value,
        email: siteRequest.email,
        url: siteRequest.url,
        creationTimestamp: Date.now()
    }

    winston.info("attempting to create site with generated id ", site)

    return new Promise((resolve, reject) => {
        Site.create(site)
        .then(data =>{
            winston.info("stored site in persistence, now attempting to initialize creation process")
            initializeSiteCreation(site)
            .then(res =>{
                winston.info("Initialization triggered successfully with response ", res)
                return resolve(site);
            })
            .catch(err=>{
                //todo- create error queue to handle this
                //todo- also create error handling schema
                winston.info("Error calling site client, placing error on error queue")
                return reject(new Error("Error creating site"))
            })
        })
        .catch(err =>{
            //this is an error that should return an error response to the client
            winston.info("Error storing site")
            return reject(new Error("Error storing site"))
        })

    })



}
