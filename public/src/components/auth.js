let filePicker = require('./file-picker');

module.exports = class AuthComponent {

    static get inject() {
        return [];
    }

    setState(obj) {
        this.state = Object.assign({}, this.state, obj);
    }

    constructor($) {
        this.setState = this.setState.bind(this);
        this.$ = $;
        this.state = {
            mode: 'login'
        }
        setTimeout(_ => {
            this.prepareFields();
            this.setupEvents()
        }, 0);
    }

    prepareFields() {
        this.$.find('[only]').map((index, el) => {
            if ($(el).attr('only') == this.state.mode) {
                $(el).show();
            } else {
                $(el).hide();
            }
        })
    }

    setupEvents() {
        let self = this;
        this.$.find('.switch-option').on('click', function() {
            self.$.find('.switch-option').removeClass('active');
            $(this).addClass('active');
            self.setState({
                mode: $(this).attr('value')
            });

            self.prepareFields.call(self);
        });

        this.$.find('.login-submit').on('click', (e) => {
            e.preventDefault();
            if (this.state.mode == 'login') {
                window.services.user.login(this.$.find('[name="login"]').val(), this.$.find('[name="password"]').val())
            } else {
                window.services.user.register(this.$.find('[name="login"]').val(), this.$.find('[name="password"]').val(), this.$.find('[name="name"]').val());
            }
        })
    }

    deinit() {
        this.$.detach();
    }
}