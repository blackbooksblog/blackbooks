var Router = require('express').Router;
var router = Router();

var posts = require('./posts');
var render = require('./render');
var images = require('./images');


router.use('/posts', posts);
router.use('/render', render);
router.use('/images', images);
module.exports = router;