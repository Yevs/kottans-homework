module.exports = regex => {
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
};