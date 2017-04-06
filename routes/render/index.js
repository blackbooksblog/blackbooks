var Router = require('express').Router;
var router = Router();
var fs = require('fs');
router.all('/js/:id', (req, res) => {
    let file = global.__base + 'components/' + req.params.id + '.js';
    fs.exists(file, exists => {
        if (!exists) {
            return res.status(200).send('');
        }
        let stream = fs.createReadStream(file);
        stream.pipe(res);
    })
    
})

router.all('/:id', (req, res) => {
    let componentName = req.params.id;
    if (!componentName) {
        return res.status(400);
    }

    return res.render(componentName, {
        user: {
            admin: true
        },
        data: [
            {name: 'Home', link: '/home'},
            {name: 'Books', link: '/books'},
            {name: 'Writers', link:'/writers'},
            {name: 'Links', link:'/links'},
            {name: 'Admin Tools', link:'/admin', admin: true}
        ]
    });
});

module.exports = router;