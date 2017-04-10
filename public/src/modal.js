function Modal(el, options) {
    this.cb = _ => this.windowResizeCallback();
    this.options = {
        delay: 0.1,
        opacity: 0.8,
        exists: true
    }
    this.options = Object.assign({}, this.options, options);
    this.$ = el;
    this.parent = this.$.parent();
    this.block = $('<div></div>').css({
        width: this.$.width(),
        height: this.$.height()
    });
    if (this.options.exists) {
        this.block.insertAfter(this.$);
    }
    
}

Modal.prototype.blackWindow = function () {
    if (!this.blackWindowInstance) {

        let delay = this.options.delay;

        this.blackWindowInstance = $('<div class="black-window"></div>').css({
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: `background-color ${delay}s`,
            'background-color': 'rgba(0,0,0,0)',
            'z-index': 50
        });

        this.container().on('click', (e) => {
            e.stopPropagation();
        })

        this.blackWindowInstance.on('click', (e) => {
            
            if($(e.originalEvent.target).hasClass('black-window')) {
                setTimeout(_ => this.blackWindow().css({
                    'background-color': 'rgba(0,0,0,0.0)'
                }));
                setTimeout(_ => this.destroyModal(), this.options.delay * 1000);
            }

        
        });
    }

    return this.blackWindowInstance;
}

Modal.prototype.windowResizeCallback = function () {

    this.container().css({
        top: this.block.offset().top,
        left: this.block.offset().left
    });
}

Modal.prototype.container = function () {
    if (!this.containerWindow) {
        this.containerWindow = $('<div></div>').css({
            position: 'absolute',
            'min-width': 100,
            'min-height': 100,
        })
    }
    
    return this.containerWindow;
}

Modal.prototype.launch = function () {
    let opacity = this.options.opacity;
    $('body').append(this.blackWindow());
    this.blackWindow().append(this.container());
    setTimeout(_ => this.blackWindow().css({
        'background-color': `rgba(0,0,0,${opacity})`
    }));
    console.log(this.options.exists);
    if (this.options.exists) {
        this.container().css({
            left: this.$.offset().left,
            top: this.$.offset().top
        })
    } else {
        this.container().css({
            left: '50%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
        })
    }
    this.container().append(this.$);
    setTimeout(_ => this.onOpen && this.onOpen(), this.options.delay * 1000);
    $(window).on('resize', this.cb);
}

Modal.prototype.destroyModal = function () {
    if (this.options.exists) {
         this.$.insertAfter(this.block);
    }
   
    this.container().detach();
    this.blackWindow().detach();
    this.block.detach();
    this.onClose && this.onClose();
    $(window).off('resize', this.cb);
}

module.exports = Modal;