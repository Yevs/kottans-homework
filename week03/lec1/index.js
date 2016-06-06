const deepAssign = require('./deepAssign.js');

let date = new Date();
let source1 = {
    a: [5, 4, 6],
    b: 2,
    c: new Set([1, 2, 3]),
    [Symbol.for('d')]: 'abcde',
    e: new Map([[1, 2], [date, 5]]),
    f: /^abc$/g,
    g: {
        a: 3,
        b: 4,
        c: {
            x: new Date()
        }
    },
    h: date
};
let source2 = {b: 3};

console.log('>>>COMPLEX OBJECT EXAMPLE:')
console.log('sources:');
console.log(source1);
console.log(source2);

let target = Object.create(null);

console.log('target:');
console.log(target);

deepAssign(target, [source1, source2], true);

console.log(`symbol key value == ${source1[Symbol.for('d')]}`);
console.log('target:');
console.log(target);
console.log(`symbol key value == ${target[Symbol.for('d')]}`);
console.log(`are dates equal? - ${source1.h.getTime() === target.h.getTime()}`);
console.log(`is it a deep copy? - ${!(source1.g == target.g)}`);

console.log('\n>>>NO OVERRIDE EXAMPLE');
console.log('deepAssign({a: 2}, [{b: {c: 3}}, {b: {d: 4}}]) :');
console.log(deepAssign({a: 2}, [{b: {c: 3}}, {b: {d: 4}}]));


console.log('\n>>>OVERRIDE EXAMPLE');
console.log('deepAssign({a: 2}, [{b: {c: 3}}, {b: {d: 4}}]) :');
console.log(deepAssign({a: 2}, [{b: {c: 3}}, {b: {d: 4}}], true));