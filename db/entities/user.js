let Entity = require('./entity');
let Hash = require(global.__root + 'services/hash');
let Errors = require(global.__root + 'errors').collection;
const uuidV4 = require('uuid/v4');
module.exports = class User extends Entity {

    get collectionName() {return 'users'};
    static get collectionName() {return 'users'};
    
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
            name: {
                type: 'string',
                notEmpty: true,
                words: 2 
            }
        }
    }

    async pushToken() {
        let token = uuidV4();
        this.src.tokens.push(await Hash.hash(token));
        await this.save();
        return token;
    }

    async verifyPassword(password) {
        let hash = this.src.password_hash;
        return await Hash.verify(password, hash);
    }

    async beforeInsert() {
        this.src.password_hash = await Hash.hash(this.src.password);
        this.src.tokens = [];
        this.src.admin = (await this.count()) ? false : true;
        delete this.src.password;
    }

    catchError(err) {
        if (err.code == 11000) {
            throw Errors.duplicate({
                key: 'login',
                value: err.toJSON().op.login
            })
        }
    }

    static get indexes() {
        return [
            {
                name: 'login',
                options: {
                    unique: true 
                }
            }
        ]
    }
}