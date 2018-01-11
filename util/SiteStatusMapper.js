'use strict'

const winston = require('winston')
//todo-refactor this to a model?
exports.map = function(stacks, sites){
    winston.debug("mapping stacks status ", stacks, " with sites ", sites)
    
    for(var i=0; i < sites.length; i++) {
        let site = sites[i]
        winston.debug("getting index of site ", site)
        let stackIndex = stacks.findIndex(s => s.stackName === site.siteId.S)
        winston.debug("got index ", stackIndex)
        
        let status

        if(stackIndex < 0) {
            winston.warn("missed mapping site ", site, " to stacks ", stacks)
            //todo-factor out
            status = "N/A"
        } else {
            winston.debug("hit index ", stackIndex, " for site ", site)
            status = stacks[stackIndex].status
            console.log(status)
        }

        let statusObject = {
                "S": status
            }
        console.log(statusObject)
        sites[i]["status"] = statusObject   

    }
    

    return sites
    
}