var errors = require(global.__root + 'errors').collection;
var _ = require('lodash');
var collection = require(global.__root + 'db').collection;




module.exports = class Entity {
    constructor(json) {
        this.src = json;
    }

    isInsert() {
        return !this.src._id;
    }

    async count() {
        return await collection.count(this);
    }

    async save() {
        if (this.isInsert()) {
            this.beforeInsert && await this.beforeInsert();
            return collection.saveEntity(this).then((record) => {
                this.src._id = record._id;
                return record;
            }).catch((err) => {
                if (this.catchError) {
                    this.catchError(err);
                } else {
                    throw err;
                }
            })
        } else {
            return collection.updateEntity(this);
        }
    }    

    static fromJSON(json, type) {
        Entity.match(json, type)
        return new type(json);
    }

    static match(json, type) {
        if (!json) {
            throw errors.empty();
        }
        let format = type.format;

        _.forOwn(format, (value, key) => {
            if (typeof json[key] != format[key].type) {
                throw errors.matchFailed({key: key, format: format[key]});
            } 

            if (format[key].notEmpty && !json[key]) {
                throw errors.mustBe({key: key, format: 'filled'});
            }

            if (format[key].min && json[key].length < format[key].min) {
                throw errors.mustBe({key: key, format: 'not less than ' + format[key].min + ' symbols'});
            }

            if (format[key].max && json[key].length >= format[key].max) {
                throw errors.mustBe({key: key, format: 'less than ' + format[key].max + ' symbols'});
            }

            if (format[key].words && json[key].split(' ').length < format[key].words) {
                throw errors.mustBe({key: key, format:  format[key].wordds + ' words minimum'});
            }
        });

        return true;
    }
}

