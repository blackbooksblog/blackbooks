module.exports = class Undo {
    constructor($, text, action) {
        this.$ = $;
        this.text = text;
        this.action = action;

        setTimeout(_ => this.setupEvents());
    }

    setupEvents() {
        this.component = $('<span class="undo"></span>').text(this.text);
        this.component.insertAfter(this.$);
        this.component.on('click', () => {
            this.component.detach();
            this.action();
        });
    }
}