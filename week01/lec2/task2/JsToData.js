module.exports = tree => {
    tree.match({attrs: {class: true}}, node => {
        let classes = node.attrs.class
                      .split(' ')
                      .filter(klass => klass.length > 0);
        let datas = [], newClasses = [];
        classes.forEach(klass => {
            if (/^js-/.test(klass)) {
                datas.push(klass.substr(3));  // delete "js-"
            } else {
                newClasses.push(klass);
            }
        });
        node.attrs['data-js'] = `${node['data-js'] || ''} ${datas.join(' ')}`.trim();
        node.attrs.class = newClasses.join(' ');
        return node;
    });
};