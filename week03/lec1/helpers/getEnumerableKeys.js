const isEnumerable = require('./isEnumerable');

module.exports = obj => Reflect.ownKeys(obj)
                               .filter(key => isEnumerable(obj, key));