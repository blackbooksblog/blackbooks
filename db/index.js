var conn = require('./internal/connection');

var posts = require('./posts')(conn);
var collection = require('./internal/collection');
collection = new collection(conn);

module.exports = {
    posts: posts,
    collection: collection, 
    entities: require('./entities')
}