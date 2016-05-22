const PostHTML = require('posthtml');
const fs = require('fs');

const bootstrap_classes = require('./bootstrap_classes.js');
const IgnoreClasses = require('./plugins/IgnoreClasses.js')(bootstrap_classes);
const JsToData = require('./plugins/JsToData.js');

const cmd_arguments = process.argv.slice(2);
const DEFUALT_OUTPUT_FILE = 'out.html';

if (cmd_arguments.length === 0) {
    console.log('Please, specify an input file.');
    return;
}

const input_file = cmd_arguments[0];
const output_file = cmd_arguments[1] || DEFUALT_OUTPUT_FILE;


fs.readFile(input_file, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    PostHTML([IgnoreClasses, JsToData])
    .process(data)
    .then(res => {
        fs.writeFile(output_file, res.html, err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
});