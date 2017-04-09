
let Entity = require('./entity');

module.exports = class Post extends Entity {

    get collectionName() {return 'posts'};
    static get collectionName() {return 'posts'};
    
    async beforeInsert() {
        this.src.date = Date.now();
        this.src.author = this.src.author.toObjectId();
    }

    static get format () {
        return {
            title: {
                type: 'string',
                max: 140,
                notEmpty: false
            },
            author: {
                type: 'string',
                notEmpty: true 
            },
            text: {
                type: 'string',
                notEmpty: true,
                min: 5 
            }
        }
    }
}