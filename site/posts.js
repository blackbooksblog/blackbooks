var Router = require('express').Router;
var router = Router();

router.get('/:id', async function(req, res) {
    
    res.render('post-page', {
        params: {
            postId: req.params.id 
        },
        user: req.user 
    })
}.catchy());

module.exports = router;
