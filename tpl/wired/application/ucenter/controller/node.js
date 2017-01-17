/**
 * Created by megic on 2015/11/28 0028.
 */
module.exports = function ($this) {
    let action = {};

    action['_before'] =async function () {//先执行的公共函数
        $this.user=await $this.getCheckAuth('$Admin');//检查是否有用户组权限，有返回登录信息继续执行
    };
    action['_after'] = function *() {//最后执行的公共函数
        // console.log($this.user)
    };

    action['add']= async function () {//新增
        "use strict";
        let node = await $D('node').create($this.POST);
        $this.success(node);
    };

    action['update']= async function () {//编辑更新
        "use strict";
        let where = {id:$this.POST['id']};
        await $D('node').update($this.POST, {where: where});
        $this.success();
    };

    action['findOne']= async function () {//查找
        "use strict";
        let node = await $D('node').findById($this.GET['id']);
        $this.success(node);
    };

    action['findAll']= async function (){//所有列表
        "use strict";
        let perPages=$this.GET['perPages']?$this.GET['perPages']:10;//每页数据数
        let currentPage=$this.GET['currentPage']?$this.GET['currentPage']:1;//查询页码
        let where = {};//过滤
        let res = await $D('node').findAndCountAll({
            where: where,
            limit: perPages,
            offset: perPages * (currentPage - 1)
            ,raw: true
        });
       $this.success(res);
    };

    action['search']= async function () {//简易搜索
        "use strict";
        let perPages=$this.GET['perPages']?$this.GET['perPages']:10;//每页数据数
        let currentPage=$this.GET['currentPage']?$this.GET['currentPage']:1;//查询页码
        let where = {};
        if(!isNaN($this.GET['searchValue'])){
            where[$this.GET['searchKey']]=$this.GET['searchValue'];
        }else{
            where[$this.GET['searchKey']]={
                $like:'%'+$this.GET['searchValue']+'%'
            };
        }
        let res = await $D('node').findAndCountAll({
            where: where,
            limit: perPages,
            offset: perPages * (currentPage - 1)
            ,raw: true
        });
        $this.success(res);

    };

    action['delete']= async function () {//登录
        "use strict";
        await $D('node').destroy({where:{id:$this.POST['id']}});
        $this.success();
    };

    return action;
};