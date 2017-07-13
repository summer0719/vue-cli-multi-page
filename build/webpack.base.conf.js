var path = require('path')
var config = require('../config')
var cssLoaders = require('./css-loaders')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var glob = require('glob');
var entries = getEntry('./src/module/**/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);

// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中
var ExtractTextPlugin = require('extract-text-webpack-plugin');
config.devtool = 'source-map';

module.exports = {
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        /* ---- 生成的例子 vendors.61714a310523a3df9869.js --- */
        //filename: '[name].[hash].js'
        /* ---- 生成的例子 vendors.js?f3aaf25de220e214f84e --- */
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue': 'vue/dist/vue.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'module': path.resolve(__dirname, '../src/module'),
            'vux-components': 'vux/src/components',
            'jquery': 'jquery',
            'select2': 'select2',
            'highcharts': 'highcharts',
            'moment': 'moment',
            // 'dropzone': 'dropzone'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                //include: projectRoot,
                exclude: /node_modules/

            },
            { test: /\.less$/, loader: 'style!css!less' }, {
                test: /\.html$/,
                loader: 'vue-html'
            },
            //字体
            {
                test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,
                loader: 'url?limit=10000&name=/fonts/[name].[ext]'
            }, {
                //test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: path.join(config.build.assetsSubDirectory, '[name].[hash:7].[ext]')
                }
            }, {
                test: /vux.src.*?js$/,
                loader: 'babel'
            }
        ]
    },
    vue: {
        loaders: cssLoaders()
    },
    plugins: [
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 公共模块的名称
            chunks: chunks, // chunks是需要提取的模块
            minChunks: chunks.length
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.ProvidePlugin({
            select2: "select2"
        }),
        new webpack.ProvidePlugin({
            highcharts: "highcharts"
        }),
        new webpack.ProvidePlugin({
            moment: "moment",
            "window.moment": "moment"
        }),
        // new webpack.ProvidePlugin({
        //     dropzone: "dropzone"
        // }),
        // 配置提取出的样式文件
        new ExtractTextPlugin('css/[name].css')
    ]



}

function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
    });

    return entries;
}
