function FilePicker (el, options) {
    this.id = services.file.getId();
    this.options = Object.assign({}, {
        noRedIcon: false,
        onChange: null 
    }, options);

    this.el = el;
    this.setup();
    this.deinit = () => {
        this.el.detach();
    };

    

    console.log('file picker constructor id', this.id);
}

FilePicker.prototype.getPicture = function() {
    let id = this.id;
    console.log(id);
    let pic = services.store.get('file').get(`id-${id}`);
    console.log('pic', pic);

    return pic;
}

FilePicker.prototype.clear = function() {
    let id = this.id;
    services.store.get('file').set(`id-${id}`, null);
}

FilePicker.prototype.setReady = function(on) {

    if (this.options.noRedIcon) {
        return;
    }

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
    let thisid = this.id;
    let self = this;
    services.store.get('file').subscribe(`id-${thisid}`, id => {
        if (this.options.onChange) {
            return this.options.onChange(id);
        }
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

        services.file.send(file, thisid, self.el);
    })
}

FilePicker.prototype.open = function () {
    this.hiddenFile.trigger('click');
}

module.exports = (e, opts) => {
    return new FilePicker(e, opts);
}