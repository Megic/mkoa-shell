module.exports=async function(){
    let member=await $D('role').create({'name': '普通用户',key:'$Member'});//默认管理组
    let adminRole=await $D('role').create({'name': '系统管理员',key:'$Admin'});//默认管理员
    await $D('group').create({'name': '默认用户组'});//默认用户组
    //增加默认管理员
    let admin=await $D('user').create({
        name: '管理员',username:'ADmegic',password:$F.encode.md5('admin'),groupId:1
    });
    await admin.addRole(member);//基础角色
    await admin.addRole(adminRole);//分配管理角色
};