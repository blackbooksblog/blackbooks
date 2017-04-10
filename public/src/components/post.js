let Undo = require('./undo');
let Share = require('./share');

module.exports = class PostComponent {
    constructor (el) {
        console.log('init');
        this.$ = el;
        setTimeout(_ => this.setupEvents(), 200);
        this.postEdit = this.postEdit.bind(this);
        this.postDelete = this.postDelete.bind(this);
        this.postCommit = this.postCommit.bind(this);
        this.postCancel = this.postCancel.bind(this);
        this.postShare = this.postShare.bind(this);
        this.postGo = this.postGo.bind(this);
        this.displayGo();
    }

    displayGo () {
        if (location.pathname == "/") {
            this.$.find('.post-go').show();
        } else {
            this.$.find('.post-go').hide();
        }
    }

    postGo() {
        if (this.postId) {
            location.href = location.origin + '/go/post/' + this.postId;
        }
    }

    postShare() {
        if (!this.share) {
            this.share = new Share(this.postId);
        }

        this.share.show();
    }

    setupEvents() {
        this.postId = this.$.find('.single-post').attr('postid') || this.$.attr('postid');
        this.$.find('.post-edit').on('click', this.postEdit);
        this.$.find('.post-delete').on('click', this.postDelete);
        this.$.find('.post-commit').on('click', this.postCommit);
        this.$.find('.post-cancel').on('click', this.postCancel);
        this.$.find('.post-share').on('click', this.postShare);
        this.$.find('.post-go').on('click', this.postGo);
    }

    postCancel() {
        this.leaveEditMode();
        this.reload();
    }

    reload() {
        services.store.get('posts').notify('old-post', this.postId);
    }

    postEdit() {
        

        this.enterEditMode();
    }

    postCommit () {
        if (!this.editMode) {
            return false;
        }

        let body = '<div>' + this.$.find('.post-editable').summernote('code') + '</div>';


        let title = $(body).find('.post-title').text();
        body = $(body).find('.post-body').html();

        services.post.update(this.postId, title, body);

        this.leaveEditMode();
    }

    enterEditMode() {
        this.$.find('.post-editable').summernote({
            airMode: true 
        });
        this.editMode = true;
        this.$.find('.post-edit').hide();
        this.$.find('.post-delete').hide();
        this.$.find('.post-commit').show();
        this.$.find('.post-cancel').show();
        this.$.find('.post-share').hide();
    }

    leaveEditMode() {
        this.$.find('.post-editable').summernote('destroy');
        this.editMode = false;
        this.$.find('.post-commit').hide();
        this.$.find('.post-cancel').hide();
        this.$.find('.post-edit').show();
        this.$.find('.post-delete').show();
        this.$.find('.post-share').show();
    }

    undoDelete() {
        services.post.undoDelete(this.postId, _ => {
            this.$.show();
        });
    }

    postDelete() {
        services.post.delete(this.postId, () => {
            
            new Undo(this.$, "Post was deleted. Click to undo", _ => {
                this.undoDelete();
            })
            this.$.hide();
        });
    }

    detach() {
        this.$.find('.post-edit').off('click', this.postEdit);
        this.$.find('.post-delete').off('click', this.postDelete);
        this.$.find('.post-commit').off('click', this.postCommit);
        this.$.find('.post-cancel').off('click', this.postCancel);
    }
}