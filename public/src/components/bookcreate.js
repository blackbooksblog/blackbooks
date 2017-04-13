let linkPicker = require('./link');
let filePicker = require('./file-picker');
module.exports = class CreateBookComponent {

    static get inject() {
        return ['modal'];
    }

    getIsEditing(el) {
        return el.find('div.note-editable').is(':focus')
    }

    constructor($, Modal) {
        this.Modal = Modal;
        this.$ = $;
        this.linkpicker = linkPicker(this.$.find('.book-attach-link'));
        this.filepicker = filePicker($.find('.book-file-picker'));
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
        this.input.attr('placeholder', 'Share a book...');
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
        this.hint.text('Book description goes here. Double click on typed text for options');
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
            input.attr('placeholder', 'Author, Book name?');
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
            let link = this.getLink();
            if (!link) {
                return services.show.error('You must provide a link to a book');
            }

            if (!title) {
                return services.show.error('You must author name and book title');
            }
            services.book.submit(title, body, link, _ => {
                this.input.val('');
                this.$.find('.new-post-editor').summernote('empty');
                this.createHint();
                this.linkpicker.currentLink = "";
                this.linkpicker.updateState();
                setTimeout(_ => this.a.destroyModal(), 2000);
            })
        })

        setTimeout(_ => this.setupTryBlur(), 500);

        
    }

    getLink() {
        return this.linkpicker.currentLink;
    }

    deinit() {
        this.$.detach();
    }
}