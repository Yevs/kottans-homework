;'use strict';

function* enumerate(iterable) {
    let index = 0;
    for (let iterator of iterable) {
        yield [index++, iterator];
    }
}

function promisify(obj) {
    if (obj instanceof Promise) {
        return obj;
    }
    return Promise.resolve(obj);
}

function isObject(obj) {
    return obj === Object(obj);
}

function isIterable(obj) {
    if (!isObject(obj)) {
        return false;
    }
    return Symbol.iterator in obj;
}


class ExtendedPromise extends Promise {

    static map(input, mapper) {
        return new this((resolve, reject) => {
            promisify(input).then(iterable => {
                let pendingPromises = 0;
                let results = [];
                if (!isIterable(iterable)) {
                    reject(new TypeError('input must be Iterable or a Promise<Iterable>'));
                }
                for (let iterator of iterable) {
                    pendingPromises++;
                    promisify(iterator).then(iterator => {
                        promisify(mapper(iterator)).then(value => {
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

    static reduce(input, reducer, initialValue) {
        const useFirst = arguments.length <= 2;
        let accumulator;
        return new this((resolve, reject) => {
            promisify(initialValue).then(initialValue => {
                promisify(input).then(input => {
                    if (!isIterable(input)) {
                        if (useFirst) {
                            throw new TypeError('Input does not resolve to Iterable');
                        } else {
                            resolve(initialValue);
                        }
                    }
                    let length = 0;
                    let promiseAccumulator = Promise.resolve(initialValue);
                    for (let [index, value] of enumerate(input)) {
                        length++;
                        promisify(value).then(value => {
                            if (!index && useFirst) {
                                promiseAccumulator = Promise.resolve(value);
                                return;
                            }
                            promiseAccumulator = promiseAccumulator.then(accumulator => {
                                return promisify(reducer(accumulator, value, index, length));
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