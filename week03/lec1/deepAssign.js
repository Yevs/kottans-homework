const isObject = require('./helpers/isObject');
const getEnumerableKeys = require('./helpers/getEnumerableKeys.js');
const cloneRegExp = require('./helpers/cloneRegExp.js');
const deepAssignNoOverride = require('./deepAssignNoOverride.js');
const deepAssignOverride = require('./deepAssignOverride.js');


module.exports = (target, sources, override=false) => {
    if (target == null) {
        throw new TypeError();
    }
    sources.forEach(source => {
        if (override) {
            deepAssignOverride(target, source);
        } else {
            deepAssignNoOverride(target, source);
        }
    });
    return target;
};
