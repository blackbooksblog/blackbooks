// db.posts.createIndex()

let conn = require('../db/internal/connection');

module.exports = async function () {
    await conn.posts.ensureIndex({title:"text", text:"text"});
}