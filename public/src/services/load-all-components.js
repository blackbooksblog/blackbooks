var Component = require('../component');

let loadedComponents = {};

let loadAll = function () {
    let all = $('[place]');
    all.each((index, el) => {
        let componentName = $(el).attr('place');
        let attributes = Array.from($(el).get(0).attributes).map(_ => {
            return `${_.name}=${_.value}`;
        }).join('&');

        let alreadyLoaded = loadedComponents[componentName];

        if (alreadyLoaded) return;
        else {
            loadedComponents[componentName] = true;
        }

        if (componentName.indexOf('post-id') == 0) return;

        Component.load(componentName, {
            attributes: attributes
        }).apply($(el));
    });
};

loadAll.main = 'body-index';

module.exports = loadAll;