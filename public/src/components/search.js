module.exports = class SearchComponent {

    static get inject() {
        return ['modal'];
    }

    constructor($, Modal) {
        this.Modal = Modal;
        this.$ = $;
        setTimeout(_ => this.setupEvents(), 200);
    }

    removeModal() {
        this.a = null;
    }

    setupEvents() {
        this.$.on('click', () => {
            if (this.a) {
                return;
            }
            let Modal = this.Modal;

            this.a = new Modal($('.search-bar'), {
                opacity: 0.4
            });
            this.a.launch();
            this.a.onOpen = _ => $('.search-bar').focus();
            this.a.onClose = _ => this.removeModal();
        });
    }

    deinit() {
        this.$.detach();
    }
}