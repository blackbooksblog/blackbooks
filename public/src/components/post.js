module.exports = class PostComponent {
    constructor (el) {
        this.$ = el;
        setTimeout(_ => this.setupEvents(), 1000);
        this.postEdit = this.postEdit.bind(this);
        this.postDelete = this.postDelete.bind(this);
    }

    setupEvents() {
        this.$.find('.post-edit').on('click', this.postEdit);
        this.$.find('.post-delete').on('click', this.postDelete);
    }

    postEdit() {
        this.$.find('.post-editable').summernote({
            airMode: true 
        });

        this.enterEditMode();
    }

    enterEditMode() {
        this.$.find('.post-edit').hide();
        this.$.find('.post-delete').hide();
        this.$.find('.post-commit').show();
        this.$.find('.post-cancel').show();
        this.$.find('.post-share').hide();
    }

    leaveEditMode() {
        this.$.find('.post-commit').hide();
        this.$.find('.post-cancel').hide();
        this.$.find('.post-edit').show();
        this.$.find('.post-delete').show();
        this.$.find('.post-share').show();
    }

    postDelete() {

    }
}