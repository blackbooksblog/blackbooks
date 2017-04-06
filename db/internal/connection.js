var mongo = require('then-mongo');
var config = require('../../config');

var collections = [
    'posts',
    'users',
];

module.exports = mongo(config.MONGO_URL, collections);