'use strict'
const initializeSiteCreation = require('../client/siteclient')
const initializeSiteDeletion = require('../client/deletesiteclient')

const getStacksByAccountId = require('../client/moodlestackclient')
const Site = require('../model/site')
const winston = require('winston')
const helper = require('../util/HttpRequestHelper')
const mapper = require('../util/SiteStatusMapper')
var randomstring = require("randomstring");

exports.getAll = function(accountId){
    winston.info("about to retrieve sites for accountId ", accountId)

    return new Promise((resolve, reject) => {
        Site.getAll(accountId).then(sites => {
            winston.info("retrieved sites ", sites, " about to enrich data for status")
            
            getStacksByAccountId(accountId)
            .then(stacks => {
                let enrichedResults = mapper.map(stacks, sites)
                return resolve(sites)                
            })
            .catch(err =>{
                //this is an error that should return an error response to the client
                winston.info("Error retrieving sites for account ", accountId, " with error ", err)
                return reject(new Error("Error retrieving stacks"))
            })
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
    winston.info("received request for accountid ", accountId, " and request ", siteRequest)
    //create sid string
    let sid  = randomstring.generate(20)

    let site = {
        accountId: accountId,
        siteId: sid,
        email: siteRequest.email,
        url: siteRequest.url,
        siteName: siteRequest.siteName,
        creationTimestamp: Date.now()
    }

    winston.info("attempting to create site with generated id ", site)

    return new Promise((resolve, reject) => {
        Site.create(site)
        .then(data =>{
            //create Site request
            let request = helper.createTenantRequest(site)
            winston.info("stored site in persistence, now attempting to initialize creation process with request", request)
            
            initializeSiteCreation(request)
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

exports.deleteSite = function(accountId, siteId){
    //create initial site object to be stored
    //todo- this needs to be refactored and moved to a model for validation
    winston.info("received delete request for accountid ", accountId, " and site ", siteId)

    return new Promise((resolve, reject) => {
       Site.delete(accountId, siteId)
        .then(res => {
            winston.info("about to initialize site deletion")

            initializeSiteDeletion(siteId)
            .then(res => {
                winston.info("Successfully deleted site ", siteId)

                return resolve("Ok");
            })
            .catch(err=>{
                //todo- create error queue to handle this
                //todo- also create error handling schema
                winston.info("Error calling delete site client, placing error on error queue ", err)
                return reject(new Error("Error calling delete service"))
            })
       })
       .catch(err =>{
            //this is an error that should return an error response to the client
            winston.info("Error deleting site from dynamodb ", err)
            return reject(new Error("Error deleting site"))
        })

    })



}