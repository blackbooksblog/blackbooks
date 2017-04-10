var Router = require('express').Router;
var router = Router();
var authMiddleware = require(global.__root + 'services').authMiddleware;

router.inject = ['user'];

router.all('/me', async (req, res, cb) => {
    res._json(req.user);
});

router.post('/register', async function (req, res, next) {
    let id = await router.services.user.register(req.body);
    res._json({
        _id: id 
    });
}.catchy());

router.post('/login', async function(req, res, next) {
    let cookie = await router.services.user.login(req.body);
    res._auth(cookie);
}.catchy());

router.all('/protected', authMiddleware.user, (req, res) => {
    res._json({
        user: req.user
    });
});

router.all('/logout', authMiddleware.user, (req, res) => {
    res.clearCookie('userid');
    res.clearCookie('token');
    res._json({
        logout: true 
    });
}); 

module.exports = router;