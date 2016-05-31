function hasProps(object) {
    for (let prop in object) {
        return true;
    }
    return false;
}

function copy(object, except) {
    var copied = {};
    for (let prop in object) {
        if (prop === except) {
            continue;
        }
        if (typeof object[prop] === 'object' &&
            hasProps(object[prop]) &&
            !Array.isArray(object[prop])) {
            copied[prop] = copy(object[prop], except);
            if (!hasProps(copied[prop])) {
                delete copied[prop];
            }
        } else {
            copied[prop] = object[prop];
        }
    }
    return copied;
}

/** recursively deletes attribute from object
  * so there won't be attributes without attributes
  * e.g. copy({a:2, b: {c: 3}}, 'c') -> {a: 2}*/
module.exports = (object, attribute) => {
    return copy(object, attribute);
};