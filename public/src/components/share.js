let Modal = require('../modal');

module.exports = class ShareMenu {
    constructor(postId) {
        this.postId = postId;
        this.copyLink = this.copyLink.bind(this);
        this.copyVK = this.copyVK.bind(this);
        this.copyFacebook = this.copyFacebook.bind(this);
        this.copyTwitter = this.copyTwitter.bind(this);
    }

    show() {
        this.modal = new Modal(this.getShareDialog(), {
            exists: false 
        });
        this.modal.launch();
    }

    getShareDialog() {
        if (!this.dialog) {
            this.dialog = $(`<div class="share-dialog center">
                <div class="post-action share-action share-twitter pointer"><i class="fa fa-twitter" aria-hidden="true"></i><span>Twitter</span></div>
                <div class="post-action share-action share-facebook pointer"><i class="fa fa-facebook" aria-hidden="true"></i><span>Facebook</span></div>
                <div class="post-action share-action share-vk pointer"><i class="fa fa-vk" aria-hidden="true"></i><span>VK</span></div>
                <div class="post-action share-action share-link pointer"><i class="fa fa-link" aria-hidden="true"></i><span>Copy Link</span></div>
            </div>`).css({
                width: 400,
                height: 210,
                background: 'white',
            });

            this.setupEvents(this.dialog);
        }

        return this.dialog;
    }

    setupEvents(el) {
        el.find('.share-link').on('click', this.copyLink);
        el.find('.share-vk').on('click', this.copyVK);
        el.find('.share-facebook').on('click', this.copyFacebook);
        el.find('.share-twitter').on('click', this.copyTwitter);
    }

    getPostLink() {
        return location.origin + '/go/post/' + this.postId;
    }

    copyLink() {
        services.share.clip(this.getPostLink());
        services.show.success('Link copied!');
    }

    copyVK () {
        services.share.click('http://vk.com/share.php?url=' + this.getPostLink());
    }

    copyFacebook() {
        services.share.click('https://facebook.com/sharer/sharer.php?app_id=797267377076091&display=popup&ref=plugin&src=share_button&u=' + encodeURI(this.getPostLink()));
    }

    copyTwitter() {
        services.share.click('https://twitter.com/intent/tweet?text=' + encodeURI(this.getPostLink()));
    }
}