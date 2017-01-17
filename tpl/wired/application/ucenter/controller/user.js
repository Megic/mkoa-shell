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

    action['add']= async function () {//新增用户
        "use strict";
        $this.POST['password'] = $F.encode.md5($this.POST['password']);//加密密码
        let node = await $D('user').create($this.POST);
        $this.success(node);
    };

    action['addRole']= async function () {//增加用户角色
        "use strict";
       let user= await $D('user').findById($this.POST['id']);
       let role=await $D('role').findById($this.POST['roleId']);
       await user.addRole(role);//分配管理角色
        $this.success();
    };

    action['removeRole']= async function () {//删除用户角色
        "use strict";
        let user= await $D('user').findById($this.POST['id']);
        let role=await $D('role').findById($this.POST['roleId']);
        await user.removeRole(role);//删除某个角色
        $this.success();
    };

    action['getRole']= async function () {//获取用户角色
        "use strict";
        let user= await $D('user').findById($this.POST['id']);
        let roles=await user.getRoles();//所有用户角色
        $this.success(roles);
    };

    action['update']= async function () {//编辑更新
        "use strict";
        let where = {id:$this.POST['id']};
        //是否处理密码
        if($this.POST['changePassword']){
            $this.POST['password'] = $F.encode.md5($this.POST['password']);//加密密码
        }else{
            if( $this.POST['password'])delete $this.POST['password'];
        }
        await $D('user').update($this.POST, {where: where});
        $this.success();
    };

    action['findOne']= async function () {//查找
        "use strict";
        let node = await $D('user').findById($this.GET['id']);
        $this.success(node);
    };

    action['findAll']= async function (){//所有列表
        "use strict";
        let perPages=$this.GET['perPages']?$this.GET['perPages']:10;//每页数据数
        let currentPage=$this.GET['currentPage']?$this.GET['currentPage']:1;//查询页码
        let where = {};//过滤
        let res = await $D('user').findAndCountAll({
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
        let res = await $D('user').findAndCountAll({
            where: where,
            limit: perPages,
            offset: perPages * (currentPage - 1)
            ,raw: true
        });
        $this.success(res);

    };

    action['delete']= async function () {//登录
        "use strict";
        await $D('user').destroy({where:{id:$this.POST['id']}});
        $this.success();
    };

    return action;
};