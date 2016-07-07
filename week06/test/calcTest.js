const calc = require('../calc')
const should = require('chai').should()
const expect = require('chai').expect

describe('calc', function() {
    it('should add numbers', function() {
        calc('1,2').should.equal(3)
        calc('1,2,3').should.equal(6)
        calc('10,20,30,40').should.equal(100)
    })

    it('should work with new line chars', function() {
        calc('1\n2').should.equal(3)
        calc('1,2\n3').should.equal(6)
    })

    it('should throw err when there is no number between delimiters', function() {
        expect(() => calc('1,\n2')).to.throw(TypeError)
    })

    it('should map empty string to 0', function() {
        calc('').should.equal(0)
    })

    it('should work with only one number', function() {
        calc('1').should.equal(1)
    })

    it('should support custom delimiter', function() {
        calc('//[;]\n1;2;3').should.equal(6)
    })

    it('should throw error for negatives', function() {
        expect(() => calc('1,-1,2')).to.throw(TypeError, 'Negatives not allowed, -1')
        expect(() => calc('1,-1,-2')).to.throw(TypeError, 'Negatives not allowed, -1,-2')
    })

    it('should ignore numbers greater than 1000', function() {
        expect(calc('1,1001')).to.equal(1)
    })

    it('should work with custom delimiter of custom length', function() {
        calc('//[***]\n1***2').should.equal(3)
    })

    it('should work with more than one delimiter', function() {
        calc('//[.][;]\n1.2;3').should.equal(6)
    })
})