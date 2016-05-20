const PostHTML = require('posthtml');
const bootstrap_classes = require('./bootstrap_classes.js');
const IgnoreClasses = require('./IgnoreClasses.js')(bootstrap_classes);
const JsToData = require('./JsToData.js');

const inputHTML = '<div class="col-lg-12 asd asd js-smth">asd</div>';

PostHTML()
.use(IgnoreClasses)
.use(JsToData)
.process(inputHTML)
.then(res => {
    console.log(res.html);
});