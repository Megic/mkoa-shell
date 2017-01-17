module.exports = function(app){
    //自动监测已经创建的entry文件夹变化，为减少监听文件，新增模块webpack/entry需重启app.js
    if($C.delcontrollerCache) {//监控webpack自动编译
        let webpack = require('webpack');
        let fs = require('fs');
        let path = require('path');
        let chokidar = require('chokidar');
        let entrywatch;
        let oldArry=[];
        //加载Mkoa各模块下webpack目录文件
        function getEntryPath(){
            "use strict";
            let libArr=[];
            let apppath=$C.ROOT+ '/' +$C.application;
            let moudelList = fs.readdirSync(apppath);
            moudelList.forEach(function(item){
                if(fs.statSync(apppath + '/' + item).isDirectory()){
                    let mdPath=apppath + '/' + item+ '/webpack/entry/' ;//加载入口文件
                    if(fs.existsSync(mdPath)) libArr.push(path.normalize(mdPath));//监听入口文件夹
                    let cssPath=apppath + '/' + item+ '/webpack/css/' ;//加载入口文件
                    if(fs.existsSync(cssPath)) libArr.push(path.normalize(cssPath));//监听css文件
                }});
            return libArr;
        }
        //执行webpack命令
        let baseConfig=require('../config.base.js');
        let apppath=path.normalize($C.ROOT+ '/' +$C.application);
        function runwepack(filepath){
            if(filepath&&filepath.indexOf("\\webpack\\css\\")>0)filepath=filepath.replace('\\webpack\\css','\\webpack\\entry').replace('.css','.js');
           // if(filepath&&filepath.indexOf("\\webpack\\entry\\")>0){
             if(filepath&&fs.existsSync(filepath)){
               let name= filepath.toString().replace(apppath,'').replace('\\webpack\\entry','').replace('.js','');
               baseConfig.entry={};//修改入口文件
               baseConfig.entry[name]=filepath;
                 // baseConfig.plugins=[];//取消公共文件
                 baseConfig.module.loaders[1].loader='style!css';
                 //console.log(baseConfig.module.loaders)
                 baseConfig.plugins.shift();
                 baseConfig.plugins.shift();
               console.log('开始编译：'+filepath);
               webpack(baseConfig, function(err, stats) {
                   if(err) console.log('编译错误！');
                   console.log('编译成功！')
               });
           }
        }
        function init(){//入口文件夹变动初始化
            console.log('正在收集webpack监听目录...');
            "use strict";
            let lock=false;
            let newArr=getEntryPath();
           // let newArr=$C.ROOT+ '/' +$C.application;
            if(oldArry.length!=newArr.length){
                oldArry=newArr;
                if(entrywatch)entrywatch.close();//关闭监控
                entrywatch=chokidar.watch(oldArry, {ignored:/\.js___jb_tmp___$/})//监控文件夹及文件新增删除,
                    .on('add', path => {if(lock)runwepack(path)})
                    .on('change', path => {if(lock)runwepack(path)})
                    // .on('unlink', path =>{if(lock)runwepack(path)})
                    .on('ready', () =>{//初始化
                        console.log('webpack监听开启');
                       // runwepack();//执行webpack监控
                        lock=true;
                    });
            }
        }
        init();
    }
};
