// calling through prototype due to Object.create(null)
module.exports = (object, prop) => Object.prototype.propertyIsEnumerable.call(object, prop);
