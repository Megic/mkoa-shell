/**
 * Created by Administrator on 2016/12/23.
 */
module.exports = function($this){
    let action={};
    action['_before']=async function (){
        $this.user=await $this.getCheckAuth('$Member');
        // console.log('xxx');
        //return false;
    };
    action['_after']=async function (){
        // console.log('xxx');
        //return false;
    };
    //判断是否是图片
    let path=require('path');
    function isIMg(filepath){
        "use strict";
        let imgExt = [".png",".jpg",".jpeg",".bmp",".gif"];//图片文件的后缀名
        let ext=path.extname(filepath);
        return imgExt.indexOf(ext)>-1;
    }
    action['file']=async function (){
        await $ST['default'].upload($this,'user');//default源接收上传文件按默认方式存储到user容器
        // await $ST['default'].upload($this,'user',{
        //     file:{filename:'2016/xxx.jpg'}//自定义上传文件路径
        // });
        $this.body=$this.POST;//返回相关信息
    };
    action['piece']=async function (){//分片上传
        let status=$this.POST['status'];//步骤检查
        let uid='';//当前用户ID
        let storage='default';//使用的存储器

        if(!status) {//上传片段
            let fileInfo=await $ST[storage].uploadChunks($this,'user',{uid:uid});
            if(!$this.POST['chunks']||$this.POST['chunks']<=1){//一个分片

            }
            $this.body={"status":fileInfo?0:'类型有误'};
        }else if(status== "md5Check"){  //秒传校验
            if($this.POST['md5'] == "b0201e4d41b2eeefc7d3d355a44c6f5a"){
                $this.body={"ifExist":1, "path":"kazaff2.jpg"};
            }else{
                $this.body={"ifExist":0};
            }
        }else if(status== "chunkCheck"){  //分片校验
            let res=await $ST[storage].chunkCheck('user',{key:$this.POST['name'],chunkIndex:$this.POST['chunkIndex'],size:$this.POST['size']});
            $this.body={"ifExist":res?1:0};//返回分片是否存在
        }else if(status== "chunksMerge"){   //分片合并
           let file=await $ST[storage].chunksMerge('user',{key:$this.POST['name'],chunks:$this.POST['chunks'],ext:$this.POST['ext']});
            //记录文件信息
              if(file)await $D('file').create({
                    userId:uid?uid:0,
                    path:file.shortPath,
                    name: $this.POST.filename,
                    key:file.key,
                    type: isIMg(file.shortPath)?1:2,
                    storage:storage,
                });
             $this.body=file?file:'不存在分片文件';
        }
    };
    return action;
};