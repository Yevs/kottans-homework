const isObject = require('./helpers/isObject');
const getEnumerableKeys = require('./helpers/getEnumerableKeys.js');
const cloneRegExp = require('./helpers/cloneRegExp.js');


function copyEnumerableKeys(target, source) {
    getEnumerableKeys(source).forEach(key => {
        target[key] = copy(source[key]);
    });
}


function copy(object) {
    if (!isObject(object)) {
        return object;
    }
    if (object instanceof Date) {
        return new object.constructor(object);
    }
    if (object instanceof RegExp) {
        return cloneRegExp(object);
    }

    let result = new object.constructor();
    copyEnumerableKeys(result, object);

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


module.exports = (target, source) => {
    if (!isObject(source)) {
        return;
    }
    copyEnumerableKeys(target, source);
};
