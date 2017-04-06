
let Entity = require('./entity');

module.exports = class Post extends Entity {

    get collectionName() {return 'posts'};
    static get collectionName() {return 'posts'};
    
    
    
    static get format () {
        return {
        title: 'string',
        author: 'string',
        text: 'string',
        attachments: typeof []
        }
    }
}