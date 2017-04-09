module.exports = (req, res, next) => {
    
    if (req.user.admin) {
        next()
    } else {
        next(new Error('you are not admin'));
    }

}