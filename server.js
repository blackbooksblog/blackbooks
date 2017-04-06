var express = require('express');
var config = require('./config');
var app = express();

var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use('/api', require('./routes'));

app.use(express.static('./public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css')); 
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts')); 

app.set('views', __dirname + '/components');

app.listen(config.PORT, () => {
    console.log('app is listening on http://localhost:' + config.PORT);
});

global.__base = __dirname + '/';