module.exports = class Collection {
    constructor(conn) {

        this.conn = conn;
    }

    saveEntity(entity) {
        let collection = entity.collectionName;

        return this.conn[collection].insert(entity.src);
    }

    async count (entity) {
        let collection = entity.collectionName;
        return await this.conn[collection].count();
    }

    updateEntity(entity) {

        let collection = entity.collectionName;

        

        return this.conn[collection].update({
            _id: entity.src._id 
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

    byId(type, id) {
        return this.conn[type.collectionName].findOne({_id: id});
    }

    find(entity, query) {
        return this.all(entity, {query});
    }

    async findOne(entity, query) {
        let results = await this.find(entity, query);
        return results[0];
    }

    async findOnePopulate(entity, query) {
        let res = await this.findOne(entity, query);
        return res && new entity(res) || null;
    }

    async count(entity, query) {
        return await this.conn[entity.collectionName].count(query);
    }
}