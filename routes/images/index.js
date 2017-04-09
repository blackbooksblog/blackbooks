var Router = require('express').Router;
var router = Router();
const uuid = require('uuid/v4');

router.post('/save',(req, res) => {
    if (req.files && req.files.file) {
        let id = uuid();
        req.files.file.mv(__root + 'images/' + id);
        res._json({
            id: id
        });
    }
});

router.all('/:id',  (req, res) => {
    res.header('Content-type', 'image/jpeg');
    res.sendFile(global.__root + 'images/' + req.params.id);
});

module.exports = router;