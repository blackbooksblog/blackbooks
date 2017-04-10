// fancy reload
let Component = require('../component');

module.exports = function () {

    location.pathname = "/";

    location.reload();

    // let main = window.services.load.main;
    // $(`[place="${main}"]`).removeAttr('loaded');

    // Component.load(main).apply($(`[place="${main}"]`));

    // $('.header-white').addClass('colourless').removeClass('drop-shadow');
}