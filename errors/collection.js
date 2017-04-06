var error = require('error/typed');

module.exports = {
    matchFailed: error({
        type: 'collection',
        message: 'field {field} is not in the format {format}',
        field: null,
        format: null 
    })
}