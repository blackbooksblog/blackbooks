window.$ = require('jquery');

var Component = require('./component');

Component.load('logo').apply($('.place-logo'));
Component.load('menu').apply($('.place-menu'));
Component.load('search').apply($('.place-search'));
Component.load('badge').apply($('.place-badge'));
Component.load('create').apply($('.place-create'));
Component.load('feed').apply($('.place-feed'));