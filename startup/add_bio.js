let conn = require('../db/internal/connection');

module.exports = async function () {
    let bio = await conn.posts.findOne({bio: true});
    if (!bio) {
        await conn.posts.save({
            bio: true,
            name: '',
            text: ''
        });
    }
}