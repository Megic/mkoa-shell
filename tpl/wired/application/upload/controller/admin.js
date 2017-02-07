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
    action['findAll'] =async function () {
        let perPages=$this.GET['perPages']?parseInt($this.GET['perPages']):10;//每页数据数
        let currentPage=$this.GET['currentPage']?parseInt($this.GET['currentPage']):1;//查询页码
        let where = {
            userId:$this.user.id
        };
        if($this.GET['type'])where.type=$this.GET['type'];
        let res = await $D('file').findAndCountAll({
            where: where,
            limit: perPages,
            offset: perPages * (currentPage - 1)
            ,raw: true
        });
        $this.success(res);
    };
    return action;
};