// Mkoawebpack配置
let path = require("path");
let fs = require('fs');
let _ = require('underscore');//辅助函数
let sConfig = require(path.join(__dirname,'../../node_modules/Mkoa/Mkoa/config'))(path.join(__dirname, '../../'));
let userConfig = require('../../config/config')(path.join(__dirname, '../../'));
_.extend(sConfig, userConfig);
let $C = sConfig;
let baseConfig=require('./config.base.js');
baseConfig.entry=getFiles();//修改入口文件

module.exports = baseConfig;


function getFiles(){
    //加载Mkoa各模块下webpack目录文件作为入口文件
    let libArr={};
    let apppath=$C.ROOT+ '/' +$C.application;
    function walk(apppath,callback){
        let dirList = fs.readdirSync(apppath);
        dirList.forEach(function(item){
            if(fs.statSync(apppath + '/' + item).isDirectory()){
                walk(apppath + '/' + item,callback);
            }else{
                callback(apppath  + '/' + item,item);
            }});
    }
    let moudelList = fs.readdirSync(apppath);
    moudelList.forEach(function(item){
        if(fs.statSync(apppath + '/' + item).isDirectory()){
            let mdPath=apppath + '/' + item+ '/webpack/entry/' ;//加载入口文件
            if(fs.existsSync(mdPath)) walk(mdPath,function(filePath,fileName){
                let name=filePath.replace(apppath,'').replace('/webpack/entry/','').replace('.js','');
                libArr[name]=filePath;
            });
        }});
    return libArr;
}