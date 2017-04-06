module.exports = class CreateComponent {
    constructor($) {

        this.$ = $;
        setTimeout(_ => this.setupEvents(), 0)
        this.state = {
            text: ""
        };
    }

    revertState(e) {
        if (e.key == 'Backspace') {
            return false;
        }
        e.preventDefault();
        return true;
    }

    setState(newState, e) {
        let newText = newState.text;
        let reverted = newText.length > 3000 && this.revertState(e);
            
        if (reverted) {
            return;
        }
        
        this.state = newState;
    }

    setupEvents() {
        let input = this.$.find('.new-post-input');

        input.on('click', () => {
            input.addClass('active');
            input.removeClass('passive');
            this.$.find('.new-post-submit').removeClass('hide');
            this.$.css({
                height: 100
            })
            input.attr('placeholder', 'Article title?');
        });

        input.on('blur', () => {
            if (input.val()) {
                return;
            }
            this.$.css({
                height: 40
            })
            this.$.find('.new-post-submit').addClass('hide');
            input.addClass('passive');
            input.removeClass('active');
            input.attr('placeholder', 'Post something new...');
        });

        input.on('keydown', ($e) => {
            this.setState({
                text: input.val()
            }, $e);
        })

        input.on('keyup', () => {

            setTimeout(_ => input.val() ? input.addClass('has-text') : input.removeClass('has-text'), 20);
                
            

            let lines = input.val().split('\n').length;
            
            if (lines < 3) {
                this.$.css({
                    height: 100
                });
                return input.css({
                    height: ""
                });
            }
            else {
                this.$.css({
                    height: 100 + 20 * (lines - 3)
                });
                return input.css({
                    height: 100 + 20 * (lines - 3)
                });
            }

        })
    }
}