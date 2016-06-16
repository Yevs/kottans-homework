const isObject = require('./isObject.js');

module.exports = (obj) => {
    if (!isObject(obj)) {
        return false;
    }
    return Symbol.iterator in obj;
};