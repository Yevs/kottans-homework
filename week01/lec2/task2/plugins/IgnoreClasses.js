const deleteAttribute = require('./helpers/DeleteAttribute.js');

module.exports = _ignoredClasses => {
    const ignoredClasses = new Set(_ignoredClasses);
    return tree => {
        tree.match({attrs: {class: true}}, node => {
            const classes = node.attrs.class
                            .split(' ')
                            .filter(klass => klass.length > 0)
                            .filter(klass => !ignoredClasses.has(klass))
                            .join(' ');
            if (classes.length > 0) {  // any classes are left
                node.attrs.class = classes;
            } else {
                deleteAttribute(node, 'class');
            }
            return node;
        });
    };
};