var errors = require('rfr')('errors').collection;
var _ = require('lodash');
var collection = require('rfr')('db').collection;

module.exports = class Entity {
    constructor(json) {
        this.src = json;
    }

    isInsert() {
        return !this.src._id;
    }

    save() {
        if (this.isInsert()) {
            return collection.saveEntity(this).then((record) => {
                this.src._id = record._id;
                return record;
            });
        } else {
            return collection.updateEntity(this);
        }
    }    

    static fromJSON(json, type) {
        Entity.match(json, type)
        return new type(json);
    }

    static match(json, type) {
        let format = type.format;

        _.forOwn(format, (value, key) => {
            if (typeof json[key] != format[key]) {
                throw errors.matchFailed({key, format: format[key]});
            }
        });

        return true;
    }
}

