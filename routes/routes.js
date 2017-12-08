var express = require('express');
var router = express.Router();

router.get('/users', (req, res) => {
    res.json(users)
})
  
router.post('/users', (req, res) => {
    const user = {
        id: ++userIdCounter,
        name: req.body.name
    }
    users.push(user)
    res.status(201).json(user)
})
  
  
const getUser = (userId) => users.find(u => u.id === parseInt(userId))
  
// Ephemeral in-memory data store
const users = [{
        id: 1,
        name: 'Joe'
    }, {
        id: 2,
        name: 'Jane'
}]
let userIdCounter = users.length
  
module.exports = router;