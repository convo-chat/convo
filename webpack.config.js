const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: "./web/static/js/app.js",
    output: {
        path: "./priv/static",
        filename: "js/app.js"
    },
    module: {
        loaders: [{
            test: /\.css?$/,
            loader: ExtractTextPlugin.extract('css?sourceMap')
        },{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                plugins: ['transform-runtime'],
                presets: ['react', 'es2015', 'stage-0']
            }
        },{
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want
            // to get copied to your output
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'deps', 'web/static'],
    }, 
    plugins: [
        new ExtractTextPlugin('css/app.css')
    ]
};
