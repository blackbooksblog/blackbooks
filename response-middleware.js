module.exports = function (req, res, next) {
    res._json = function(j, code) {
        j = j || {};
        if (j.error) {
            res.json(Object.assign({}, {
                uri: req.url,
                method: req.method,
                success: false,
            }, j));
        } else {
            res.json(Object.assign({}, {
                uri: req.url,
                method: req.method,
                success: true,
                keys: Object.keys(j),
                body: j
            }));
        }
    }

    res._auth = function (cookieObject) {
        res.cookie('userid', cookieObject.userid.toString(), {
            maxAge: 30*24*60*60*1000
        }).cookie('token', cookieObject.token, {
            maxAge: 30*24*60*60*1000
        })._json(cookieObject);
        return res;
    }

    next();
}