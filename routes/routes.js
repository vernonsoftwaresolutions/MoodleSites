'use strict'

var express = require('express');
var router = express.Router();

router.get('/accounts/:aid/sites', (req, res) => {
    res.json({aid:req.params.aid})
})
  
router.post('/accounts/:aid/sites', (req, res) => {
    const user = {
        id: 1,
        name: req.body.siteId
    }
    res.status(201).json(user)
})
  
module.exports = router;