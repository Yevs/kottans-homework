function Spy(target, method) {
    let counter = {count: 0}
    let oldMethod = target[method]
    target[method] = function() {
        counter.count++
        return oldMethod.apply(this, arguments)
    }
    return counter
}

module.exports = Spy