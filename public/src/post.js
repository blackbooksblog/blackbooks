var Component = require('./component');



module.exports = function post(id) {
    return Component.load('post/' + id);
}