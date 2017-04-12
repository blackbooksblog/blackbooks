module.exports = class ImageMenu {
    constructor ($, options) {
        this.$ = $;
        this.options = Object.assign({}, this.defaultOptions(), options);
    }

    defaultOptions() {
        return {
            color: 'black'
        };
    }

    getEditTemplate() {
        let template = `
            <div class="overlay-edit">

                <i class="fa fa-pencil icon-highlight overlay-action-edit" aria-hidden="true"></i>
                <i class="fa fa-times icon-highlight overlay-action-delete" aria-hidden="true"></i>

            </div>
        `;

        return $(template);
    }

    onEdit(cb) {
        this.editCb = cb;
    }

    onDelete(cb) {
        this.deleteCb = cb;
    }

    attachEditEvents(el) {
        el.find('.overlay-action-edit').on('click', _ => this.editCb && this.editCb());
        el.find('.overlay-action-delete').on('click', _ => this.deleteCb && this.deleteCb());
    }

    attachEditMode () {

        let editElement = this.getEditTemplate();

        this.attachEditEvents(editElement);

        this.attach(editElement);

    }
    attach(el) {
        if (this.currentAttachment) {
            this.currentAttachment.detach();
        } 

        this.currentAttachment = el;    
        this.currentOverlay.append(this.currentAttachment);
        this.currentAttachment.css({
            position: "absolute",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        });
    }

    overlay () {
        let color = this.options.color;
        if (!this.currentOverlay) {
            this.currentOverlay = $(`
                <div class="${color}-overlay overlay"></div>
            `);
        }

        this.currentOverlay.css({
            position: 'absolute',
            left: 0,
            top: 0,
            height: this.$.height(),
            width: this.$.width()
        });

        return this.currentOverlay;
    }

    show() {
        this.overlay().insertAfter(this.$);
    }

    hide() {
        this.overlay().detach();
    }
}