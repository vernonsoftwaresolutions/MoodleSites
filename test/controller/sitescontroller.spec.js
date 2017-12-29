// const assert = require('chai').assert
// const mockery = require('mockery')
// const controller = require('../../controllers/sitescontroller')

// describe('sites controller', () => {
//     let response = {
//         messageId: "MESSAGEID"
//     };
//     describe('post sites good request', () => {
//         let requestBody = {
//             accountId: 10,
//             siteId: 11
//         }
        
//         beforeEach(() => {
//             mockery.enable({
//                 warnOnUnregistered: false,
//                 useCleanCache: true,
//             })
//             mockery.registerMock('../../model/site', {
//                 create: (accountId) => {
//                     assert.equal(site.accountId, requestBody.accountId);
//                     return Promise.resolve(response);
//                 },
//             });
//         })
        

//         it('returns statusCode 201', (done) => {
            
//         })            
//     })

// })