'use strict'

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
const getConfigByKey = require('../config/config');
const winston = require('winston')

exports.createSite = function(site){
    let request = new AWS.DynamoDB({region: getConfigByKey('REGION'), apiVersion: '2012-08-10'});
    // Create the DynamoDB service object
    let params = {
        Item: {
            accountId: {
                S: site.accountId
              },
            siteId: {
                S: site.siteId
              },
            siteName: {
                S: site.siteName
            },
            email: {
                S: site.email
            },
            url: {
                S: site.url
            },
            creationTimestamp: {
                N: site.creationTimestamp.toString()
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

exports.deleteSite = function(accountId,siteId){
    let request = new AWS.DynamoDB({region: getConfigByKey('REGION'), apiVersion: '2012-08-10'});
    // Create the DynamoDB query object
    var params = {
        Key:{
            "accountId":{S: accountId},
            "siteId":{S: siteId}
        },
       TableName: getConfigByKey('TABLE_NAME')
      };
      
      winston.info("about to delete with params ", params)
      //execute query and resolve or reject
      return new Promise((resolve, reject)=>{        
        request.deleteItem(params, function(err, data) {
            if (err) {
                winston.error("error deleting site ", err)
                return reject(err)
            } else {
                winston.info("deleted site ", data)
                return resolve(data)
            }
        });   
    })
}

exports.getSites = function(accountId){
    let request = new AWS.DynamoDB({region: getConfigByKey('REGION'), apiVersion: '2012-08-10'});
    // Create the DynamoDB query object
    var params = {
        ExpressionAttributeValues: {
          ':s': {S: accountId}
         },
       KeyConditionExpression: 'accountId = :s',
       TableName: getConfigByKey('TABLE_NAME')
      };
      
      winston.info("about to query with params ", params)
      //execute query and resolve or reject
      return new Promise((resolve, reject)=>{        
        request.query(params, function(err, data) {
            if (err) {
                winston.error("error retrieving objects ", err)
                return reject(err)
            } else {
                winston.info("returned data ", data)
                return resolve(data.Items)
            }
        });   
    })
}


