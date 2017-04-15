let fs = require('fs-promise');

module.exports = async function () {
    return fs.ensureDir(global.__root + 'images');
}