var error = require('error/typed');

module.exports = {
    matchFailed: error({
        type: 'collection',
        message: 'field {key} is not in the format {format}',
        key: null,
        format: null 
    }),
    mustBe: error({
        type: 'collection',
        message: 'field {key} must be {format}',
        key: null,
        format: null
    }),
    empty: error({
        type: 'collection',
        message: 'json was empty',
    }),
    duplicate: error({
        type: 'collection',
        message: '{key} "{value}" already exists',
        key: null,
        value: null 
    })
}