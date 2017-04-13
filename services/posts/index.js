let db = require(global.__root + 'db');
var timeAgo = require('node-time-ago');
module.exports = class Posts {
    static async getById(_id) {
        return await db.collection.findOne(db.entities.Post, {_id: _id.toObjectId()});
    }

    static async getProcessed(_id) {
        let post = undefined;
        let admin = undefined;
        if (_id == 'bio') {
            post = await db.collection.findOne(db.entities.Post, {bio: true});
            admin = await db.collection.findOne(db.entities.User, {admin: true});
        } else {
            post = await Posts.getById(_id);
        }

        

        if (!post) {
            throw new Error('Post not found');
        }

        post.date = timeAgo(post.date || 0);
        post.body = post.text || 'Your bio...';
        
        if (_id == 'bio') {
            post.title = post.title || post.name || admin.name;
        }

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