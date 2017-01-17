// Mkoawebpack配置
let path = require("path");
let fs = require('fs');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let _ = require('underscore');//辅助函数
let proot=path.join(__dirname, '../../');
let sConfig = require(path.join(__dirname,'../../node_modules/Mkoa/Mkoa/config'))(proot);
let delconfig=(process.argv.indexOf('-p')>-1)?'../../config/config':'../../config/development/config';
let userConfig = require(delconfig)(proot);
_.extend(sConfig, userConfig);
let $C = sConfig;
let extractCSS = new ExtractTextPlugin('[name].css',{allChunks: true});
let webpackconfig=require('./common');
module.exports = {
    entry:'', //加载入口文件
    module: {
        loaders: [//各类文件处理器
            {test: /\.js$/, loader: "babel",query: {presets: [require.resolve('babel-preset-es2015')]}},
            {test: /\.css$/, loader:extractCSS.extract("style", "css")},
            {test: /\.json$/,   loader: 'json'},
            {test: /\.html$/,   loader: 'html'},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"}
        ]
    },
    output: {
        path: $C.ROOT+'/'+$C.static_pathName+'/'+$C.V,//打包输出的路径
        filename: '[name].js' //打包后的名字
        ,publicPath:($C.host?$C.host:'http://localhost/')+$C.V+"/"//资源文件前缀
        ,chunkFilename: "[name].chunk.js"//给require.ensure用
    },
    externals: webpackconfig.externals,
    resolveLoader: {
        modulesDirectories: [
            __dirname+'/node_modules'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js')//公共代码
        ,extractCSS//公共样式
    ],
    resolve: {
        root:  [path.join(__dirname, 'lib'),path.join(__dirname,'node_modules')]//公共库文件夹
        ,alias: webpackconfig.alias
    }
};
