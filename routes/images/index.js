var Router = require('express').Router;
var router = Router();

router.all('/:id', (req, res) => {
    res.sendFile(__dirname + '/test.jpg');
});

module.exports = router;