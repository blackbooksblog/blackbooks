let filePicker = require('./file-picker');

module.exports = class CreateComponent {

    static get inject() {
        return ['modal'];
    }

    getIsEditing(el) {
        return el.find('div.note-editable').is(':focus')
    }

    constructor($, Modal) {
        this.filepicker = filePicker($.find('.file-picker'));
        this.Modal = Modal;
        this.$ = $;
        setTimeout(_ => this.setupEvents(), 0);
    }

    setupTryBlur() {
        $('.new-post-editor').summernote({
                airMode: true, 
                minHeight: '100px',
                callbacks: {
                    onFocus: _ => {
                        if (this.hint) {
                            this.hint.detach();
                            this.hint = null;
                        }
                    }
                }
        });
    }

    tryBlur() {
        this.$.css({
            height: 40
        })
        this.$.find('.new-post-submit').addClass('hide');
        this.input.addClass('passive');
        this.input.removeClass('active');
        this.input.attr('placeholder', 'Post something new...');
        this.area.addClass('hide');
        this.a = null;
    }

    editor() {
        return this.$.find('.new-post-editor');
    }

    onEditorOpen() {
        this.$.find('.new-post-input').focus();
        
        if (!this.editor().summernote('isEmpty')) {
            return;
        }
        this.createHint();
    }

    createHint() {
        let offset = $('.new-post-editor').next().offset();
        if (this.hint) {
            this.hint.detach();
        }
        this.hint = $('<p class="hint-text"></p>').css({
            position: "absolute",
            top: offset.top ,
            left: offset.left ,
        });
        this.hint.text('Post text goes here. Double click on typed text for options');
        this.hint.appendTo(this.a.blackWindow());
        this.hint.on('click', () => {
            this.hint.detach();
            this.hint = null;
            this.$.find('.new-post-editor').summernote('focus');
        })
    }

    getTitle() {
        return this.$.find('.new-post-input').val();
    }

    getBody() {
        return this.$.find('.new-post-editor').summernote('code');
    }

    setupEvents() {
        let input = this.$.find('.new-post-input');
        this.input = input;
        let area = this.$.find('.new-post-content');
        this.area = area;
        this.$.on('click', () => {
            if (this.a) {
                return;
            }
            let Modal = this.Modal;
            this.a = new Modal($('.place-create'), {
                exists: true 
            });
            this.a.launch();
            this.a.onClose = _ => this.tryBlur();
            this.a.onOpen = _ => this.onEditorOpen();
            this.$.find('.new-post-submit').removeClass('hide');
            this.$.css({
                height: 140
            })
            input.attr('placeholder', 'Article title?');
            this.area.removeClass('hide');
        });

        this.$.find('.new-post-content').on('click', (e) => {
            if ($(e.originalEvent.target).hasClass('new-post-content')) {
                this.$.find('.new-post-editor').summernote('focus');
            }
        })

        this.$.find('.new-post-submit').on('click', (e) => {
            let title = this.getTitle();
            let body = this.getBody();
            services.post.submit(title, body, _ => {
                this.input.val('');
                this.$.find('.new-post-editor').summernote('empty');
                this.createHint();
                setTimeout(_ => this.a && this.a.destroyModal(), 2000);
            })
        })

        setTimeout(_ => this.setupTryBlur(), 500);

        
    }

    deinit() {
        this.$.detach();
    }
}