'use strict'
const winston = require('winston')

let defaultConfig = {
    POST_CREATION: "http://api.vssdevelopment.com/dev/moodle/tenants",
    REGION: process.env.REGION || 'us-east-1',
    TABLE_NAME: process.env.TABLE_NAME || 'SITES',
    VPC_ID: process.env.VPC_ID || 'VPC-Id',
    HOSTED_NAME: process.env.HOSTED_NAME || 'hostedzone',
    STACK_NAME: process.env.STACK_NAME || 'stackname'
}

//method to get env specific config v
function getConfig(){
    let env = process.env.NODE_ENV

    if (env) {
        env = env.toLowerCase();
    }
    winston.info("returning config for env ", env)
    switch (env) {
        case 'dev':
            return {
                POST_CREATION: "https://api.vssdevelopment.com/dev/moodle/tenants"                
            }
        case 'stage':
            return {
                POST_CREATION: "https://api.vssdevelopment.com/stage/moodle/tenants"                
            }
    }
}
//method to override config values
const getConfigByKey = function(key){
    return Object.assign({}, defaultConfig, getConfig())[key];    
}

module.exports = getConfigByKey;