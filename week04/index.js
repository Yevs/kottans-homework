const ExtendedPromise = require('./extendedPromise');

ExtendedPromise.map(
    [Promise.resolve(1), Promise.resolve(2)],
    v => v*2)
    .then(v => console.log(v));