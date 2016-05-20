module.exports = _ignoredClasses => {
    let ignoredClasses = new Set(_ignoredClasses);
    return tree => {
        tree.match({attrs: {class: true}}, node => {
            let klass = node.attrs.class;
            klass = klass.split(' ')
                         .filter(klass => klass.length > 0)
                         .filter(klass => !ignoredClasses.has(klass))
                         .join(' ');
            if (klass.length > 0) {  // any classes are left
                node.attrs.class = klass;
            } else {
                delete node.attrs.class;
            }
            return node;
        });
    };
};