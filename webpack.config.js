var pkg = require('./package.json');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        audio: './src/audio.js'
    },
    output: {
        path: './dist',
        filename: '[name].min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }, {
            test: /\.(gif|jpeg|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url?limit=40000'
        }]
    },
    plugins: [
        new webpack.BannerPlugin([
            pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
            'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
            pkg.license + ' license'
        ].join('\n')),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("style.min.css")
    ]
};