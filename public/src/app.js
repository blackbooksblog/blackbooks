window.$ = window.jQuery = require('jquery');

require('bootstrap');
require('./style.css');
require('../styles/');
require('./deps/summernote');

window.Vue = require('vue').default;
require('vue-resource');

let Modal = require('./modal');

setTimeout(_ => {
    $('body').addClass('stop-scrolling');

    $('.feed').on('wheel', e => {
        e.stopPropagation();
    })

    $(window).on('wheel', e => {
        let delta = e.originalEvent.deltaY;
        $('.feed').scrollTop($('.feed').scrollTop() + delta);
    })
}, 200);

let services = require('./services');

window.services = services;
window.services.load();

window.overlay = require('./components/overlay');