var Router = require('express').Router;
var router = Router();

var authMiddleware = require(global.__root + 'services').authMiddleware;
var services = require(global.__root + 'services');

var posts = require('./posts');
var render = require('./render');
var images = require('./images');
var auth = require('./auth');

var routers = [posts, render, images, auth];
routers.map(r => {
    if (r.inject) {
        r.services = {};
        r.inject.map(s => {
            r.services[s] = services[s];
        });
    }
});

router.use(authMiddleware.user);

router.use('/posts', posts);
router.use('/render', render);
router.use('/images', images);
router.use('/auth', auth);


module.exports = router;