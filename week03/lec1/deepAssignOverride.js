const isObject = require('./helpers/isObject');
const getEnumerableKeys = require('./helpers/getEnumerableKeys.js');


function copyEnumerableKeys(target, source) {
    getEnumerableKeys(source).forEach(key => {
        target[key] = copy(source[key]);
    });
}


function copy(object) {
    if (!isObject(object)) {
        return object;
    }
    if (object instanceof Date ||
        object instanceof RegExp ||
        object instanceof Map ||
        object instanceof Set) {
        return new object.constructor(object);
    }

    let result = new object.constructor();
    copyEnumerableKeys(result, object);
    return result;
}


module.exports = (target, source) => {
    if (!isObject(source)) {
        return;
    }
    copyEnumerableKeys(target, source);
};
