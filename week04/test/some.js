"use strict";

var assert = require("assert");
var testUtils = require("./helpers/util.js");
Promise = require('../extendedPromise.js');

/*
Based on When.js tests

Open Source Initiative OSI - The MIT License

http://www.opensource.org/licenses/mit-license.php

Copyright (c) 2011 Brian Cavalier

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

var RangeError = Promise.RangeError;

describe("Promise.some-test", function () {

    specify("should resolve values array", function() {
        var input = [1, 2, 3];
        return Promise.some(input, 2).then(
            function(results) {
                assert(testUtils.isSubset(results, input));
            },
            assert.fail
        )
    });

    specify("should resolve promises array", function() {
        var input = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
        return Promise.some(input, 2).then(
            function(results) {
                assert(testUtils.isSubset(results, [1, 2, 3]));
            },
            assert.fail
        )
    });

    specify("should not resolve sparse array input", function() {
        var input = [, 1, , 2, 3 ];
        return Promise.some(input, 2).then(
            function(results) {
                assert.deepEqual(results, [void 0, 1]);
            },
            function() {
                console.error(arguments);
                assert.fail();
            }
        )
    });

    specify("should reject with all rejected input values if resolving howMany becomes impossible", function() {
        var input = [Promise.resolve(1), Promise.reject(2), Promise.reject(3)];
        return Promise.some(input, 2).then(
            assert.fail,
            function(err) {
                //Cannot use deep equality in IE8 because non-enumerable properties are not
                //supported
                assert(err[0] === 2);
                assert(err[1] === 3);
            }
        )
    });

    specify("should accept a promise for an array", function() {
        var expected, input;

        expected = [1, 2, 3];
        input = Promise.resolve(expected);

        return Promise.some(input, 2).then(
            function(results) {
                assert.deepEqual(results.length, 2);
            },
            assert.fail
        );
    });

    specify("should reject when given immediately rejected promise", function() {
        var err = new Error();
        return Promise.some(Promise.reject(err), 1).then(assert.fail, function(e) {
            assert.strictEqual(err, e);
        });
    });
});