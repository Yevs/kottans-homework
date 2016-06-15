const ExtendedPromise = require('./extendedPromise');

ExtendedPromise
.reduce([1,2,3], (sum, val) => {throw err;}, 0)
.then(x => {console.log(x);})
.catch(e => {console.log('CATCHED');});