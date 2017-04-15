var Router = require('express').Router;
var router = Router();

var Post = require(global.__root + 'db/entities/post');

var Collection = require(global.__root +'db').collection;
var postsService = require(global.__root + 'services').posts;

router.post('/', async function (req, res){
    let query = req.body.query;

    let results = await Collection.all(Post, {
        query :{
            $text: {$search: query},
            deleted: {$exists: false}
        }, 
        sort :{
            book: 1
        }

    });

    res._json({
        results 
    });
}.catchy());

module.exports = router;