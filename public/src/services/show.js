let show = {}

var ProgressBar = require('progressbar.js')

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

let progressBars = {
    last: 0
}

show.createProgressLine = function() {
    let div = $('<div class="progress-line">');

    let blackWindow = $('.black-window');
    let body = $('body');

    if (blackWindow.length) {
        div.appendTo(blackWindow.last());
    } else {
        div.appendTo(body);
    }

    progressBars[progressBars.last] = new ProgressBar.Line(div.get(0),  {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 500,
        color: '#42404b',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%', position: 'absolute'},
    });

    progressBars[progressBars.last].set(0.05);

    return progressBars.last++;
}

show.createProgressCircle = function(el) {

    let div = $('<div class="animated-progress">');

    div.appendTo(el);

    div.css({
        position:"absolute",
        width: 30,
        height: 30,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    });


    progressBars[progressBars.last] = new ProgressBar.Circle(div.get(0), {
        color: '#eba8a2',
        trailColor: '#eee',
        strokeWidth: 4,
        duration: 500,
        easing: 'easeInOut'
    });

    progressBars[progressBars.last].set(0.05);

    return progressBars.last++;
}

show.progress = function(id, progress) {
    var line = progressBars[id];
    if (!line) {
        return null;
    }

    line.animate(progress, {}, _ => {
        if (progress == 1) {
            show.destroy(id);
        }
    });
}

show.destroy = function(id) {
    try {
        progressBars[id].destroy();
        progressBars[id] = null;
        $('.animated-progress').detach();
        $('.progress-line').detach();
    } catch(e) {

    }
}

module.exports = show;