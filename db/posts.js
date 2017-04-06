const Collection = require('./internal/collection');

module.exports = (conn) => {
    return new Posts(conn);
}

class Posts extends Collection {
    constructor(conn) {
        super(conn);
    }
}