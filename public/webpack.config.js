 var ExtractTextPlugin = require('extract-text-webpack-plugin');
 
 module.exports = {
     entry: './src/app.js',
     output: {
         path: __dirname + '/bin',
         filename: 'app.bundle.js'
     },
     
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
 };