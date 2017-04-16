let filepicker = require('./file-picker');

module.exports = class AvatarOverlay {
    constructor (el) {
        this.$ = el;
        
    }

    element() {
        this.layer = $('<i class="fa fa-pencil pointer" aria-hidden="true"></i>');

        this.layer.appendTo(this.$);

        this.layer.css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            color: 'white',
            opacity: 0,
            transition: 'opacity 0.2s'
        });

        this.filepicker = filepicker(this.layer, {
            onChange: function(newId) {
                services.user.avatar(newId);
            }
        });
    }

    enable() {
        console.log('mouseenter');
        this.layer.css({
            opacity: 1
        });
    }

    disable() {
        this.layer.css({
            opacity: 0
        });
    }

    show() {
        this.element();

        this.$.on('mouseenter', _ => {
            this.enable();
        });

        this.$.on('mouseleave', _ => {
            this.disable();
        })
    }
}