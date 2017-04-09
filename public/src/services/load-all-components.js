var Component = require('../component');


let loadAll = function () {
    let all = $('[place]');
    all.each((index, el) => {
        let componentName = $(el).attr('place');
        let alreadyLoaded = $(el).attr('loaded');
        if (alreadyLoaded) return;
        Component.load(componentName).apply($(el));
    });
};

loadAll.main = 'body-index';

module.exports = loadAll;