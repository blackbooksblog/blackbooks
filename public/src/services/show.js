let show = {}

function showMessage(message, color, background) {
    let error = $('<div/>').addClass('error-message');
    error.css({
        background: background,
        color: color,
        opacity: 0 
    }).text(message);

    let elToAppend = $('.black-window').length ? $('.black-window') : $('body');
    elToAppend.append(error);

    setTimeout(() => {
        error.css({
            opacity: 1
        })
    }, 20);

    setTimeout(() => {
        error.css({
            opacity: 0
        })
    }, 1500);
    

    setTimeout(() => {
        error.detach();
    }, 2000);

    return {
        after: function(cb) {
            setTimeout(() => {
                cb();
            }, 1600);
        }
    }
}

show.error = function (message) {
    return showMessage(message, '#fff', '#F33B3E');
}

show.success = function (message) {
    return showMessage(message, '#fff', '#59CF85');
}



module.exports = show;