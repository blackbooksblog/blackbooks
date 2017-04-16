var Router = require('express').Router;
var router = Router();


var User = require(global.__root + 'db/entities/user');
var Collection = require(global.__root +'db').collection;
var postsService = require(global.__root + 'services').posts;
var Entity = require(global.__root + 'db/entities/entity');

router.post('/avatar', async function (req, res){
    let fileid = req.body.fileid;

    if (!fileid) {
        throw new Error('Avatar must be an image');
    }

    if (!req.user) {
        throw new Error('You must be logged in to change avatar');
    }

    let user = await Entity.get(User, req.user._id.toString());
    console.log(user);


    user.src.avatar = fileid;

    await user.save();

    res._json({
        avatar: fileid 
    });
}.catchy());

module.exports = router;