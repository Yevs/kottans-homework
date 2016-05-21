module.exports = (node, attribute) => {
    delete node.attrs[attribute];
    let no_properties = true;
    for (let prop in node.attrs) {
        no_properties = false;
        break;
    }
    if (no_properties) {
        delete node.attrs;
    }
};