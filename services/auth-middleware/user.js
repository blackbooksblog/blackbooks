let userService = require('../user');

module.exports = (req, res, next) => {
    let cookies = req.cookies;
    userService.verifyToken(cookies).then((user) => {
        
        req.user = user;
        next();
    })
}