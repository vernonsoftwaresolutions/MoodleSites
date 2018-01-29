'use strict'

const express = require('express');
const router = express.Router();
const service = require('../service/siteservice')
const winston = require('winston')

router.get('/accounts/:aid/sites', (req, res) => {
    let accountId = req.params.aid
    winston.info("received GET request for accountId ", accountId)    
    service.getAll(accountId)
    .then(result => {
        winston.info("about to return data ", result)
        res.status(200).json(result)
    })
    .catch(err => {
        winston.info("Returning 500 error ", err)
        res.status(500).json({message: "Internal Server Error"})        
    })
})
  
router.post('/accounts/:aid/sites', (req, res) => {
    let accountId = req.params.aid
    let site = req.body

    service.createSite(accountId, site)
    .then(result => {
        winston.info("returning successful ", result)
        res.status(201).json(result)        
    })
    .catch(err => {
        //todo- more explicit error handling
        winston.info("Returning 500 error ", err)
        res.status(500).json({message: "Internal Server Error"})
    })
})
router.delete('/accounts/:aid/sites/:sid', (req, res) => {
    let accountId = req.params.aid
    let siteId = req.params.sid
    try {
        service.deleteSite(accountId, siteId)
        .then(result => {
            winston.info("returning successful ", result)
            res.status(200).json({message:result})        
        })
        .catch(err => {
            //todo- more explicit error handling
            winston.info("Returning 500 error ", err)
            res.status(503).json({message: "Service Unavailable"})
        })
    }
    catch(err){
        winston.error("Exception thrown while processing request ", err)

        res.status(500).json({message: "Internal Server Error"})

    }
})
  
module.exports = router;