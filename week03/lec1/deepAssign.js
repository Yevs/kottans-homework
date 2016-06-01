const isEnumerable = (object, prop) => Object.prototype.propertyIsEnumerable.call(object, prop);
const isObject = object => object === Object(object);


function cloneRegExp(regex) {
    const pattern = regex.source;
    let flags = '';
    if (regex.global) {
        flags += 'g';
    }
    if (regex.ignoreCase) {
        flags += 'i';
    }
    if (regex.multiline) {
        flags += 'm';
    }
    return new RegExp(pattern, flags);
}


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
    Reflect.ownKeys(object)
           .filter(key => isEnumerable(object, key))
           .forEach(key => {

                let value = object[key];
                result[key] = copy(value);

                if (value instanceof Map) {
                    for (let [itemKey, itemVal] of value) {
                        result[key].set(copy(itemKey), copy(itemVal));
                    }
                    return;
                }

                if (value instanceof Set) {
                    for (let item of value) {
                        result[key].add(copy(item));
                    }
                    return;
                }
            });
    return result;
}


function deepAssign(target, source) {
    if (!isObject(source)) {
        return;
    }
    Reflect.ownKeys(source)
       .filter(key => isEnumerable(source, key))
       .forEach(key => {
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