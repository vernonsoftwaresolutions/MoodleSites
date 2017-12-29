'use strict'

const express = require('express');
const router = express.Router();
const createSite = require('../service/siteservice')
const winston = require('winston')

router.get('/accounts/:aid/sites', (req, res) => {
    res.json({})
})
  
router.post('/accounts/:aid/sites', (req, res) => {
    let accountId = req.params.aid
    
    createSite(accountId).then(res => {
        winston.info("returning successful ", res)
        res.status(201).json({message: "Created"})        
    })
    .catch(err => {
        //todo- more explicit error handling
        winston.info("Returning 500 error ", err)
        res.status(500).json({message: "Internal Server Error"})
    })
})
  
module.exports = router;