;'use strict';

const isIterable = require('./helpers/isIterable');
const enumerate = require('./helpers/enumerate');

class ExtendedPromise extends Promise {

    static map(input, mapper) {
        return new this((resolve, reject) => {
            this.resolve(input).then(iterable => {
                let pendingPromises = 0;
                let results = [];
                if (!isIterable(iterable)) {
                    reject(new TypeError('input must be Iterable or a Promise<Iterable>'));
                }
                for (let iterator of iterable) {
                    pendingPromises++;
                    this.resolve(iterator).then(iterator => {
                        this.resolve(mapper(iterator)).then(value => {
                            results.push(value);
                            if (!--pendingPromises) {
                                resolve(results);
                            }
                        }, reject);
                    }, reject);
                }
            }, reject);
        });
    }

    static some(input, count) {
        return new this((resolve, reject) => {
            this.resolve(input).then(input => {
                let pendingCount = 0;
                let resolved = [];
                let rejected = [];
                for (let promise of input) {
                    this.resolve(promise).then(value => {
                        if (resolved.length < count) {
                            resolved.push(value);
                        }
                        if (resolved.length == count) {
                            resolve(resolved);
                        }
                    }, error => {
                        rejected.push(error);
                        if (pendingCount - rejected.length < count) {
                            reject(rejected);
                        }
                    });
                }
            }, reject);
        });
    }

    static reduce(input, reducer, initialValue) {
        const useFirst = arguments.length <= 2;
        let accumulator;
        return new this((resolve, reject) => {
            this.resolve(initialValue).then(initialValue => {
                this.resolve(input).then(input => {
                    if (!isIterable(input)) {
                        if (useFirst) {
                            throw new TypeError('Input does not resolve to Iterable');
                        } else {
                            resolve(initialValue);
                        }
                    }
                    let length = 0;
                    let promiseAccumulator = this.resolve(initialValue);
                    for (let [index, value] of enumerate(input)) {
                        length++;
                        this.resolve(value).then(value => {
                            if (!index && useFirst) {
                                promiseAccumulator = this.resolve(value);
                                return;
                            }
                            promiseAccumulator = promiseAccumulator.then(accumulator => {
                                return this.resolve(reducer(accumulator, value, index, length));
                            }, reject);
                            if (index == length - 1) {
                                promiseAccumulator.then(resolve, reject);
                            }
                        }, reject);
                    }
                    if (length == 0) {
                        resolve(initialValue);
                    }
                }, reject);
            }, reject);
        });
    }

}

module.exports = ExtendedPromise;