#!/usr/bin/env node 
var program = require('commander');
var appInfo = require('./package.json');
var fs = require('fs-extra');
var cprocess = require('child_process');

program
    .version(appInfo.version)
    .usage('mk [options]')
    .description('MKOA命令行工具')
        .on('--help', function() {
        //这里输出子命令的帮助
        console.log('  Examples:');
        console.log('    运行方法：');
        console.log('    mk b');
        console.log();
    });

// //子命令
program.command('build')
    //短命令 - 简写方式
    .alias('b')
    //resume的子命令
    .option("-t, --type <mode>", "创建类型")
    //注册一个callback函数
    .action(function(options){
        var pjpath=process.cwd();//项目目录
        options.type=options.type?options.type:'full';
        fs.copySync(__dirname+'/tpl/'+options.type+'/', pjpath);//复制文件
        console.log('成功创建Mkoa项目！正在运行npm install...');
        var ls =cprocess.exec('npm install',{cwd:pjpath});//执行npm安装
        ls.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        ls.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        ls.on('exit', function (code) {
            console.log('安装完成，请执行node --harmony-async-await app.js  启动!');
        });

    });

program .command('create')
    //短命令 - 简写方式
    .alias('c')
    //resume的子命令
    .option("-n, --name <mode>", "输出我的名字")
    //注册一个callback函数
    .action(function(options){
        var nm = typeof options.name=='string'?options.name:"";
        console.log('cc "%s" 使用 %s 模式',  nm);
    });


program.parse(process.argv);