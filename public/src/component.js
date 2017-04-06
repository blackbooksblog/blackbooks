function Component(promise, name) {
    this.promise = promise;
    this.name = name;
}

const components = require('./components');

Component.load = function(componentName) {
    return new Component($.get('/api/render/' + componentName), componentName);
}

Component.prototype.apply = function (element) {
    this.promise.then((html) => {
        let newElem = $(html);
        element.append(newElem);
        this.js(newElem);
    })
};

Component.prototype.js = function (el) {
    if (components[this.name]) {
        let constructor = components[this.name];
        let instance = new constructor(el);
    }
}

module.exports = Component;







