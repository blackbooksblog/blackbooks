function FilePicker (el) {
    this.el = el;
    this.setup();
    this.deinit = () => {
        this.el.detach();
    }
}

FilePicker.prototype.setReady = function(on) {
    if (on) {
        this.redDot = $('<div class="red-dot"></div>');
        this.redDot.css({
            position: 'absolute',
            top: 7,
            left: 20 
        })
        this.el.append(this.redDot);
    } else {
        $('.red-dot').detach();
    }

    
}

FilePicker.prototype.setup = function () {
    this.hiddenFile = $('<input type="file">');
    
    services.store.get('file').subscribe('id', id => {
        this.setReady(!!id);
    })

    this.el.on('click', _ => {
        _.stopPropagation();
        this.open();
    })

    this.hiddenFile.on('change', function () {
        if (!this.files.length) {
            return;
        }
        
        // only one for now
        let file = this.files[0];

        services.file.send(file);
    })
}

FilePicker.prototype.open = function () {
    this.hiddenFile.trigger('click');
}

module.exports = (e) => {
    return new FilePicker(e);
}