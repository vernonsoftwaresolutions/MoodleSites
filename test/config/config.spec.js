'use strict'
var decache = require('decache');
const getConfigByKey = require('../../config/config')
const assert = require('chai').assert

describe('While no environment is provided', () => {
    describe('and the POST_CREATION key is provided', () => {
        it('POST_CREATION is not overwritten', () => {
            console.log(getConfigByKey)
            
            const val = getConfigByKey('POST_CREATION')
            assert.equal(val, "http://api.vssdevelopment.com/dev/moodle/tenants")
        })

    })
})
describe('While no region environment is provided', () => {
    it('REGION is not overwritten and default', () => {
        console.log(getConfigByKey)
        
        const val = getConfigByKey('REGION')
        assert.equal(val, "us-east-1")
    })
    it('TABLE_NAME is not overwritten and default', () => {
        console.log(getConfigByKey)
        
        const val = getConfigByKey('TABLE_NAME')
        assert.equal(val, "SITES")
    })
})
describe('While a region environment is provided', () => {
    beforeEach(() => {
        decache('../../config/config');     

        process.env.REGION = 'us-west-2'
        process.env.TABLE_NAME = 'TABLE_NAME'
        
        
    })
    afterEach(() =>{
        process.env.REGION = ''
        process.env.TABLE_NAME = ''        
        
    })   
    it('REGION is not overwritten and default', () => {
        let getConfigByKey = require('../../config/config')

        const val = getConfigByKey('REGION')
        assert.equal(val, 'us-west-2')
    })
    it('TABLE_NAME is not default', () => {
        let getConfigByKey = require('../../config/config')
        
        const val = getConfigByKey('TABLE_NAME')
        assert.equal(val, "TABLE_NAME")
    })
})
//dev tests

describe('While dev no environment is provided', () => {
    beforeEach(() => {
        process.env.NODE_ENV = 'dev'
        
    })
    afterEach(() =>{
        process.env.NODE_ENV = ''
        
    })        
    describe('and the POST_CREATION key is provided', () => {
        it('POST_CREATION is overwritten', () => {
            console.log(getConfigByKey)
            
            const val = getConfigByKey('POST_CREATION')
            assert.equal(val, "https://api.vssdevelopment.com/dev/moodle/tenants")
        })
    })
    
})

describe('While stage no environment is provided', () => {
    beforeEach(() => {
        process.env.NODE_ENV = 'stage'
        
    })
    afterEach(() =>{
        process.env.NODE_ENV = ''
        
    })        
    describe('and the POST_CREATION key is provided', () => {
        it('POST_CREATION is overwritten', () => {
            console.log(getConfigByKey)
            
            const val = getConfigByKey('POST_CREATION')
            assert.equal(val, "https://api.vssdevelopment.com/stage/moodle/tenants")
        })
    })
    
})