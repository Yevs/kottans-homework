const isEnumerable = require('./helpers/isEnumerable');
const isObject = require('./helpers/isObject');
const getEnumerableKeys = require('./helpers/getEnumerableKeys');
const cloneRegExp = require('./helpers/cloneRegExp.js');


function copy(object) {
    if (!isObject(object)) {
        return object;
    }
    if (object instanceof Date) {
        return new Date(object);
    }
    if (object instanceof RegExp) {
        return cloneRegExp(object);
    }

    let result = new object.constructor();
    getEnumerableKeys(object).forEach(key => {
        result[key] = copy(object[key]);
    });

    if (object instanceof Map) {
        for (let [itemKey, itemVal] of object) {
            result.set(copy(itemKey), copy(itemVal));
        }
    }

    if (object instanceof Set) {
        for (let item of object) {
            result.add(copy(item));
        }
    }

    return result;
}


function deepAssign(target, source) {
    if (!isObject(source)) {
        return;
    }
    getEnumerableKeys(source).forEach(key => {
        target[key] = copy(source[key]);
   });
}


module.exports = (target, ...sources) => {
    if (target == null) {
        throw new TypeError();
    }
    sources.forEach(source => {
        deepAssign(target, source);
    });
};