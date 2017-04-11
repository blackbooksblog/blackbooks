var Router = require('express').Router;
var router = Router();

var authMiddleware = require(global.__root + 'services').authMiddleware;
var services = require(global.__root + 'services');

var posts = require('./posts');

var routers = [posts];

routers.map(r => {
    if (r.inject) {
        r.services = {};
        r.inject.map(s => {
            r.services[s] = services[s];
        });
    }
});

router.use(authMiddleware.user);

router.use('/post', posts);
router.get('/home', (req, res) => {
    res.redirect('/');
})

router.get('/books', (req, res) => {
    res.render('books');
})

module.exports = router;