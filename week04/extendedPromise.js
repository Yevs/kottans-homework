;'use strict';

function* enumerate(iterable) {
    let index = 0;
    for (let iterator of itearable) {
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
            let promisifiedInput = promisify(input);
            promisifiedInput.then(iterable => {
                let pendingPromises = 0;
                let results = [];
                if (!isIterable(iterable)) {
                    reject(new TypeError('input must be Iterable or a Promise<Iterable>'));
                }
                for (let iterator of iterable) {
                    pendingPromises++;
                    let promisifiedIterator = promisify(iterator);
                    promisifiedIterator.then(iterator => {
                        let mapped = promisify(mapper(iterator));
                        mapped.then(value => {
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



}

module.exports = ExtendedPromise;