var Router = require('express').Router;
var router = Router();

var postsService = require(global.__root + 'services').posts;

router.all('/:id', function (req, res) {
    let componentName = req.params.id;

    return res.render(componentName, {
        user: req.user,
        data: [
            {name: 'Home', link: '/home'},
            {name: 'Books', link: '/books'},
            {name: 'Writers', link:'/writers'},
            {name: 'Links', link:'/links'},
            {name: 'Admin Tools', link:'/admin', admin: true}
        ]
    });
}.catchy());

router.all('/post/:id', async function(req, res) {

    let id = req.params.id;

    let post = await postsService.getProcessed(id);

    console.log(post);

    let example = {
        title: "Books are good",
        date:"22nd of March", 
        image: "/api/images/test",
        body: "Hey are you looking for something\n\nthere isn't anything to look\ngo home\nenjoy yourself\nthis was Danil - bye.",
        share: {
            count: 5,
        },
        like: {
            count: 12,
            mine: false
        }
    };

    res.render('post', {
        post,
        user: req.user
    });
}.catchy())

module.exports = router;