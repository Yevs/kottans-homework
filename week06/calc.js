function extractDelimiters(numbersStr) {
    let delimiters = numbersStr.match(/\[.*?\]/g)
    return delimiters.map(s => s.slice(1, -1))
}

function escape(string) {
    let escapeChars = new Map([
        ['*', '\\*'],
        ['.', '\\.'],
        [']', '\\]'],
        ['[', '\\['],
        ['(', '\\('],
        [')', '\\)'],
        ['{', '\\{'],
        ['}', '\\}'],
        ['?', '\\?']
    ])
    return string.split('')
                 .map(char => escapeChars.has(char) ? escapeChars.get(char) : char)
                 .join('')
}

function buildWrongPattern(delimiters) {
    return new RegExp(
        delimiters.reduce((re, delim) => `${re}|(${escape(delim)}\n)|(\n${escape(delim)})`, '(.^)')
    )
}

function buildSplitPattern(delimiters) {
    return new RegExp(
        delimiters.reduce((re, delim) => `${re}|${escape(delim)}`, '\n')
    )
}

module.exports = (numbersStr) => {
    let delimiters = [',']
    if (numbersStr.startsWith('//')) {
        delimiters = extractDelimiters(numbersStr)
        numbersStr = numbersStr.slice(numbersStr.indexOf('\n')+1)
    }
    let wrongInput = buildWrongPattern(delimiters)
    if (numbersStr.match(wrongInput)) {
        throw new TypeError
    }
    let splitPattern = buildSplitPattern(delimiters)
    let numbers =  numbersStr.split(splitPattern).map(Number)
    let negatives = numbers.filter(x => x < 0)
    if (negatives.length) {
        throw new TypeError(`Negatives not allowed, ${negatives}`)
    }
    return numbers.reduce((acc, val) => acc + (val > 1000 ? 0 : val), 0)
}