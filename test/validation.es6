/* global describe, it */
'use strict'

let expect = require('chai').expect

let testModels = require('./test-models')

describe('Validation', () => {
  it('should validate given data', () => {
    let Person = testModels.createPersonModel()
    let validationResults = Person.validate({
      givenName: 'Jeff',
      email: 'Don\'t send me emails!'
    })

    expect(validationResults).to.be.an('object')
    expect(validationResults.valid).to.equal(false)
    expect(validationResults.errors).to.have.length(2)
  })

  it('should not validate undefined properties when using definedOnly', () => {
    let Person = testModels.createPersonModel()
    let validationResults = Person.validate({
      givenName: 'Jeff',
      familyName: undefined,
      email: 'Don\'t send me emails!'
    }, { definedOnly: true })

    expect(validationResults).to.be.an('object')
    expect(validationResults.valid).to.equal(false)
    expect(validationResults.errors).to.have.length(1)
    expect(validationResults.errors[0].property).to.equal('email')
  })
})
