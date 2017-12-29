'use strict'
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
const getConfigByKey = require('../config/config');
const winston = require('winston')

const createSite = function(site){
    let request = new AWS.DynamoDB({region: getConfigByKey('REGION'), apiVersion: '2012-08-10'});
    // Create the DynamoDB service object
    let params = {
        Item: {
            accountId: {
                S: site.accountId
              },
            siteId: {
                //create guid
                S: site.siteId
              } 
        }, 
        ReturnConsumedCapacity: "TOTAL", 
        TableName: getConfigByKey('TABLE_NAME')
       };

    winston.info("about to send request to dynamodb with params ", params)
    //wrap dynamodb sdk in a promise
    //todo- this should natively return a promise with AWS's DocumentClient, 
    //however I cannot get the mocking framework to work https://www.npmjs.com/package/aws-sdk-mock
    return new Promise((resolve, reject)=>{
        request.putItem(params, (err, data)=>{
            if(err){
                winston.error("putting object ", params, "returned error ", err)
                return reject(err)
            }
            winston.info("put succeeded with response ", data)

            return resolve(data)        
        })
    })
}

module.exports = createSite;


