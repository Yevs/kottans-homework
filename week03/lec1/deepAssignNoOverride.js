const isObject = require('./helpers/isObject');
const getEnumerableKeys = require('./helpers/getEnumerableKeys.js');
const cloneRegExp = require('./helpers/cloneRegExp.js');


function deepAssign(target, source) {
    if (!isObject(source)) {
        return;
    }
    getEnumerableKeys(source).forEach((prop) => {
        let value = source[prop];
        if (!isObject(value)) {
            target[prop] = value;
        } else {
            if (target[prop] === undefined) {
                target[prop] = new value.constructor(value);
            }
            if (value instanceof RegExp) {
                target[prop] = cloneRegExp(value);
            } else if (value instanceof Map &&
                       target[prop] instanceof Map) {  // what if deepAssign({}, [{a: {b: 3}}, {a: new Map(...)}])
                for (let [key, val] of value) {
                    target[prop].set(key, val);
                }
            } else if (value instanceof Set &&
                       target[prop] instanceof Map) {  // same as for map
                for (let val of value) {
                    target[prop].add(val);
                }
            }
            deepAssign(target[prop], value);
        }
    });
}


module.exports = deepAssign;
