var Router = require('express').Router;
var router = Router();

var Post = require(global.__root + 'db/entities/post');
var Entity = require(global.__root + 'db/entities/entity');
var Collection = require(global.__root +'db').collection;
var postsService = require(global.__root + 'services').posts;

router.post('/', async function (req, res){
    let query = req.body.query;

    console.log(query);

    res._json({
        query 
    });
}.catchy());

module.exports = router;