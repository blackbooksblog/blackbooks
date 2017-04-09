var conn = require('./internal/connection');
var _ = require('lodash');
var posts = require('./posts')(conn);
var collection = require('./internal/collection');
collection = new collection(conn);

module.exports = {
    posts: posts,
    collection: collection
}

let entities = require('./entities');
_.forOwn(entities, (value, key) => {

    if (value.indexes) {
        value.indexes.map((index) => {

            conn[value.collectionName].ensureIndex(index.name, index.options);
        })
    }
})

module.exports.entities = entities;