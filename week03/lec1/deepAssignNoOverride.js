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
                target[prop] = new value.constructor();
            } else if (value instanceof RegExp ||
                       value instanceof Date ||
                       value instanceof Map ||
                       value instanceof Set) {
                target[prop] = new value.constructor(value);
            }
            deepAssign(target[prop], value);
        }
    });
}


module.exports = deepAssign;
