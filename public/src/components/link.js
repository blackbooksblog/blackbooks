let Modal = require('../modal');

function LinkPicker (el) {
    this.el = el;
    this.setup();
    this.deinit = () => {
        this.el.detach();
    }
    this.currentLink = "";
}

LinkPicker.prototype.setReady = function(on) {
    if (on) {
        this.el.find('i').show();
        this.el.find('.text').text('Ok')
    } else {
        this.el.find('.text').text('Insert a buy link');
        this.el.find('i').hide();
    }
}

LinkPicker.prototype.setup = function () {

    this.el.on('click', _ => {
        _.stopPropagation();
        this.open();
    })

   
}

LinkPicker.prototype.getWindow = function() {
    let link = this.currentLink;
    let template = `
        <div class="link-inserter">
            <div class="input-link">
                <input type="text" placeholder="Paste link here..." value="${link}"></input>
            </div>
            <span class="post-action input-link-save">Save</span>
        </div>
    `;

    this.windowInstance = $(template);  

    this.windowInstance.find('.input-link-save').on('click', _ => {
        this.currentLink = this.windowInstance.find('.input-link input').val();
        this.modalInstance.destroyModal();
    })  

    return this.windowInstance;
}

LinkPicker.prototype.open = function () {
    this.modalInstance = new Modal(this.getWindow(), {
        exists: false 
    });

    this.modalInstance.launch();
    this.modalInstance.onClose = _ => {
        this.updateState();
    }
}

LinkPicker.prototype.updateState = function() {
    this.setReady(!!this.currentLink);
}

module.exports = (e) => {
    return new LinkPicker(e);
}