module.exports = class BadgeComponent {
    constructor($) {
        this.$ = $;
        this.setupEvents();
    }

    setupEvents() {
        this.$.filter('.logout').on('click', this.logout);
    }

    logout() {
        services.user.logout();
    }
}