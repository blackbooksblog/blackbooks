let overlay = require('./avatar-overlay');

module.exports = class BadgeComponent {
    constructor($) {
        this.$ = $;
        this.setupEvents();
    }

    setupEvents() {
        this.$.filter('.logout').on('click', this.logout);

        this.overlay = new overlay(this.$.find('.profile-image'));
        this.overlay.show();
    }

    logout() {
        services.user.logout();
    }
}