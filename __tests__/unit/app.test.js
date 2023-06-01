'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../../app')

describe('General endpoints', function() {
  describe('Health check', function() {
    it('should return successful response', async() => {
      const res = await supertest(app).get('/health')
      expect(res.status).to.equal(200)
      expect(res.text).to.equal('{"message":"UP"}')
    })
  })

  describe('Not found', function() {
    it('should return not found', async() => {
      const res = await supertest(app).get('/non-existing')
      expect(res.status).to.equal(404)
    })
  })
})

// TODO: The following attempts to test the API more in deep, stubbing the controllers,
//  however it still needs more work.
//  As it is now, it only allows to set one behavior for each stub, all doubles have to
//  be configured before importing the app.

// const config = require('../../config')
// const sinon = require('sinon')
// const UserController = require('../../controllers/user')

// let app

// before(() => {
//   let userControllerStub = sinon.stub(UserController, 'findAll')
//   userControllerStub.callsFake((req, res) => {
//     console.log('FAKE')
//     res.status(200).send([])
//   })

//   app = require('../../app')
// })

// describe('Users', function () {
//   it('Should return successful response', async () => {
//     console.log({config})
//     const res = 
//       await supertest(app)
//         .get('/users')
//         .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjoiNWYzOTc3YjdiNWM2ZTRmZTkxZTU0NmI1IiwibmFtZSI6IlVzdWFyaW8gcHJ1ZWJhcyIsImVtYWlsIjoidGdhcmNpYW1pcmFuZGEyQGdtYWlsLmNvbSIsImFkbWluIjoxfSwiaWF0IjoxNTk3NjAxNzE5LCJleHAiOjMzMTIyODg4MTE5fQ.UeFymNsmC_rjxR_JTLIBrI57Z4AlUB0-XlDp84-XDac')
//     expect(res.status).to.equal(200)
//   })
// })
