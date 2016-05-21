const deleteAttribute = require('./helpers/DeleteAttribute.js');

module.exports = tree => {
    tree.match({attrs: {class: true}}, node => {
        const classes = node.attrs.class
                        .split(' ')
                        .filter(klass => klass.length > 0);
        let datas = [], new_classes = [];
        classes.forEach(klass => {
            if (/^js-/.test(klass)) {
                datas.push(klass.substr(3));  // delete "js-"
            } else {
                new_classes.push(klass);
            }
        });
        node.attrs['data-js'] = `${node['data-js'] || ''} ${datas.join(' ')}`.trim();
        node.attrs.class = new_classes.join(' ');
        if (node.attrs.class.length === 0) {
            deleteAttribute(node, 'class');
        }
        return node;
    });
};