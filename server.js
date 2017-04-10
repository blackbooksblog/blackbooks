global.__root = __dirname + '/';

var express = require('express');
var config = require('./config');
var fileupload = require('express-fileupload');
require('./catchy');
var app = express();
app.use(require('./response-middleware'));

app.use(fileupload());
app.use(require('body-parser').json());
app.use(require('cookie-parser')());


var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use('/api', require('./routes'));
app.use('/go', require('./site'));
app.use(express.static('./public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css')); 
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts')); 
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-wysiwyg/src')); 


app.set('views', __dirname + '/components');

app.use(function(err, req, res, next) {
  res.status(400)._json({
      error: err.message,      
      success: false
  });
});

app.get('/', require('./services').authMiddleware.user, function(req, res, next) {
    res.render('index', {
        user: req.user
    })
})

app.listen(config.PORT, () => {
    console.log('app is listening on http://localhost:' + config.PORT);
});

Array.prototype.mapAsync = async function (cb) {
    let i = 0;
    let newArr = [];
    for(; i < this.length; i++) {
        newArr.push(await cb(this[i]));
    }
    return newArr;
}

