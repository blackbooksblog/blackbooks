var Router = require('express').Router;
var router = Router();

var Post = require('rfr')('/db/entities/post');
var Entity = require('rfr')('/db/entities/entity');
var Collection = require('rfr')('/db').collection;
router.use((req, res, next) => {
    console.log('auth');
    next();
});

router.get('/', (req, res) => {
    
    var post = Entity.fromJSON({
        title: 'How To Read Books',
        author: 'sijfi3miai1',
        text: 'hey hey hey',
        attachments: []
    }, Post);

    post.save();

    console.log(post);
});

router.get('/all', (req, res) => {
    Collection.allPopulated(Post, {}).then((posts) => {
        console.log('will never get here');
    })
})


module.exports = router;