/**
 * Will generate auth middleware based on passed options;
 */
module.exports = {
    user: require('./user'),
    adminOnly: require('./admin-only')
};