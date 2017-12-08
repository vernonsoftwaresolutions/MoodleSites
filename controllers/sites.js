'use strict'

const express = require('express');
const router = express.Router();
let Site = require('../model/site')

router.get('/accounts/:aid/sites', (req, res) => {
    res.json(Site.getAll(req.params.aid))
})
  
router.post('/accounts/:aid/sites', (req, res) => {
    res.status(201).json(Site.create(req.params.aid))
})
  
module.exports = router;