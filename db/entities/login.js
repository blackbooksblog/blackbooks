let Entity = require('./entity');

module.exports = class Login extends Entity {
    static get format () {
        return {
            login: {
                type: 'string',
                notEmpty: true,
                min: 6,
                max: 32
            },
            password: {
                type: 'string',
                notEmpty: true,
                min: 6,
                max: 32 
            },
        }
    }
}