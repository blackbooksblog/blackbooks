function Component(promise, name, options) {
    this.promise = promise;
    this.name = name;
    this.options = Object.assign({}, {
        css: name 
    }, options);
}

const components = require('./components');

Component.instances = [];

Component.load = function(componentName, options = {}) {

    return new Component(Vue.http.get('/api/render/' + componentName + '?' + options.attributes || ""), componentName, options);
}

Component.prototype.apply = function (element) {
    this.promise.then((res) => {
        let html = res.body;
        let newElem = $(html);
        element.empty();
        element.append(newElem);
        element.attr('loaded', true);
        this.js(newElem);
        setTimeout(_ => window.services.load());
    })
};

Component.prototype.js = function (el) {
    if (components[this.name]) {
        let constructor = components[this.name];
        let injects = constructor.inject || [];

        injects = injects.map ((name) => {
            return require('./injectable')[name];
        });

        if (el.hasClass('display-false')) {
            return;
        }
        let instance = new constructor(el, ...injects);
        Component.instances.push(instance);
    } else {
        let componentName = el.attr('component');
        if (!componentName) return;
        let constructor = components[componentName];
        let injects = constructor.inject || [];

        injects = injects.map ((name) => {
            return require('./injectable')[name];
        });

        if (el.hasClass('display-false')) {
            return;
        }
        let instance = new constructor(el, ...injects);
        Component.instances.push(instance);
    }
}

Component.deinitAll = function () {
    let main = window.services.load.main;
    $(`[place="${main}"]`).empty();
}

module.exports = Component;







