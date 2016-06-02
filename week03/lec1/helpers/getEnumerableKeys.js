const isEnumerable = require('./isEnumerable');


module.exports = obj => {
    return Reflect.ownKeys(obj)
                  .filter(key => isEnumerable(obj, key));
};