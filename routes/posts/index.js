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

router.post('/', async function(req, res) {

    let count = parseInt(req.body.count) || 5;

    let posts = await Collection.all(Post, {
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
    let count = await Collection.count(Post, {});

    res._json({count: count});
}.catchy());

router.post('/older', async function(req, res) {
    let posts = await postsService.older(req.body.oldest, req.body.query, req.body.count || 10);

    res._json({posts: posts.reverse().map(post => {
        return post._id.toString()
    })});

}.catchy())


module.exports = router;