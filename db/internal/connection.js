var mongo = require('then-mongo');
var config = require('../../config');

var collections = [
    'posts',
    'users',
];

let conn = mongo(config.MONGO_URL, collections);

String.prototype.toObjectId = function () {

    try {
        return new conn.ObjectId(this.toString());
    } catch(e) {
        return null;
    }
}

module.exports = conn;