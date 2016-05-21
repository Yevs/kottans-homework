const PostHTML = require('posthtml');

const bootstrap_classes = require('./bootstrap_classes.js');
const IgnoreClasses = require('./plugins/IgnoreClasses.js')(bootstrap_classes);
const JsToData = require('./plugins/JsToData.js');

const inputHTML = `
<article class="col-lg-12 js-animation">
    <div class="btn btn-primary">Edit</div>
    <form class="form-group form-control js-send-comment js-fade-out">
        <textarea></textarea>
    </form>
</article>`;

PostHTML([IgnoreClasses, JsToData])
.process(inputHTML)
.then(res => {
    console.log(res.html);
});