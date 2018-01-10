'use strict'

const winston = require('winston')
//todo-refactor this to a model?
exports.map = function(stacks, sites){
    winston.debug("mapping stacks status ", stacks, " with sites ", sites)
    
    for(var i=0; i < stacks.length; i++) {
        console.log("BUTTHOLE")
        let stack = stacks[i]
        console.log(stack)
        winston.debug("getting index of stack ", stack)
        let siteIndex = sites.findIndex(s => s.siteId.S === stack.stackName)
        if(siteIndex < 0) {
            winston.warn("missed mapping stack ", stack, " to sites ", sites)
            continue
        }

        winston.debug("got index ", siteIndex)
        let statusObject = {
                "S": stack.status
            }
        sites[siteIndex]["status"] = statusObject   
    }
    return sites
    
}