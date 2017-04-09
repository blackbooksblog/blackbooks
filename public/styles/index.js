var req = require.context('./', true, /\.css$/);
req.keys().forEach(function(key){
    req(key);
});