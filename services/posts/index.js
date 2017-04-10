let db = require(global.__root + 'db');
var timeAgo = require('node-time-ago');
module.exports = class Posts {
    static async getById(_id) {
        return await db.collection.findOne(db.entities.Post, {_id: _id.toObjectId()});
    }

    static async getProcessed(_id) {
        let post = await Posts.getById(_id);
        if (!post) {
            throw new Error('Post not found');
        }

        post.date = timeAgo(post.date);
        post.body = post.text;

        //TODO: get likes and shares

        return post;
    }

    static async older(oldest, query, count) {
        let post = await Posts.getById(oldest);
        if (!post) {
            throw new Error('Post not found');
        }

        console.log(post);

        let older = await db.collection.find(db.entities.Post, Object.assign({}, query, {
            _id: {
                $lt: post._id
            },
            deleted: {$exists: false}
        })).limit(count);

        return older;
    }
}