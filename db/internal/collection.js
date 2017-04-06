var Entity = require('./../index')

console.log(Entity);

module.exports = class Collection {
    constructor(conn) {
        this.conn = conn;
    }

    saveEntity(entity) {
        let collection = entity.collectionName;

        return this.conn[collection].insert(entity.src);
    }

    updateEntity(entity) {
        let collection = entity.collectionName;

        return this.conn[collecton].update({
            _id: this.entity.src._id 
        }, entity.src);
    }

    all(type, opts) {
        let collection = type.collectionName; 

        let cursor = this.conn[collection]
        .find(opts.query || {}, opts.projection || null);

        if (opts.sort) {
            cursor = cursor.sort(opts.sort);
        }

        if (opts.limit) {
            cursor = cursor.limit(opts.limit);
        }

        return cursor;
    }

    allPopulated(type, opts) {
        let cursor = this.all(type, opts);

        return cursor.then((records) => {
            // console.log(records);
            console.log(Entity);
            try {
                return records.map((rec) => Entity.fromJSON(rec, type));
            } catch (e) {
                console.log(e);
            }
        });
    }
}