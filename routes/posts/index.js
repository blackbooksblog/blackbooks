var Router = require('express').Router;
var router = Router();

var Post = require(global.__root + 'db/entities/post');
var Entity = require(global.__root + 'db/entities/entity');
var Collection = require(global.__root +'db').collection;
var adminOnly = require(global.__root + 'services').authMiddleware.adminOnly;
var postsService = require(global.__root + 'services').posts;

router.post('/create', adminOnly, async function (req, res){
    var post = Entity.fromJSON({
        title: req.body.name,
        author: req.user._id.toString(),
        text: req.body.body,
        picture: req.body.picture 
    }, Post);

    await post.save();
    res._json({
        _id: post.src._id 
    });
}.catchy());

router.post('/change-image', adminOnly, async function(req, res) {

    var postId = req.body._id;
    var imageId = req.body.imageId;

    let post = await Entity.get(Post, postId);

    post.src.picture = imageId;
    await post.save();

    res._json({
        yeah: true 
    });

}.catchy());

router.post('/update', adminOnly, async function (req, res){
    console.log('here');
    
    req.body.author = req.user._id.toString();
    req.body.text = req.body.body;

    let entity = Entity.fromJSON(req.body, Post);
    
    let post = await Entity.get(Post, entity.src._id);

    if (!post) {
        throw new Error('Post not found');
    }

    post.src.text = entity.src.body;
    post.src.title = entity.src.title;

    await post.save();
    res._json({
        _id: post.src._id 
    });
}.catchy());

router.post('/delete', adminOnly, async function(req, res) {
    let post = await Entity.get(Post, req.body._id);

    if (!post) {
        throw new Error('Post not found');
    }

    post.src.deleted = true;
    await post.save();
    res._json({
        deleted: true 
    })
});

router.post('/undo-delete', adminOnly, async function(req, res) {
    let post = await Entity.get(Post, req.body._id);

    if (!post) {
        throw new Error('Post not found');
    }

    await post.restore();
    res._json({
        reverted: true 
    })
});

router.post('/', async function(req, res) {

    let count = parseInt(req.body.count) || 5;

    let posts = await Collection.all(Post, {
        query: {
            deleted: {$exists: false},
            book: {$exists: false},
            bio: {$exists: false}
        },
        limit: count,
        sort: {
            $natural: -1
        }
    });

    res._json({posts: posts.reverse().map(post => {
        return post._id.toString()
    })});

}.catchy());

router.post('/count', async function(req, res) {
    let count = await Collection.count(Post, {
        deleted: {$exists: false},
        book: {$exists: false},
        bio: {$exists: false}
    });

    res._json({count: count});
}.catchy());

router.post('/older', async function(req, res) {
    let posts = await postsService.older(req.body.oldest, req.body.query, req.body.count || 10);

    res._json({posts: posts.reverse().map(post => {
        return post._id.toString()
    })});

}.catchy())


module.exports = router;