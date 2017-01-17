/**
 * sequelize 模型定义
 */
let  DataTypes=require('sequelize');
module.exports ={
    //  datasources:'default'//存储数据源 默认为'default'
    // ,name:'user',//模型名称 默认与文件名一致,建议保持默认
    model:{ //模型json结构
        name:{
            type: DataTypes.STRING(40),
                allowNull:true,
                unique:false,
                comment: '昵称/姓名'
        },
        phone:{
            type: DataTypes.STRING(11),
                allowNull:true,
                unique:false,
                comment: '手机号码'
        },
        email:{
            type: DataTypes.STRING(80),
                allowNull:true,
                unique:false,
                comment: '邮箱'
        },
        username:{
            type: DataTypes.STRING(30),
                allowNull:true,
                unique:false,
                comment: '用户名'
        },
        password:{
            type: DataTypes.CHAR(32),
                allowNull:true,
                unique:false,
                comment: '密码'
        },
        headimgurl:{
            type: DataTypes.STRING,
                allowNull:true,
                unique:false,
                comment: '用户头像'
        },
        sessionId: {
            type: DataTypes.CHAR(32),
                allowNull:true,
                unique:false,
                comment: 'sessionId'
        },
        status: {
            type: DataTypes.INTEGER,
                allowNull:false,
                defaultValue:1,
                unique:false,
                comment: '状态'
        }
    }
    ,extend:{//模型扩展部分
        comment: '用户表',
        timestamps:true,
        indexes:[],
        paranoid:false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
    ,_after:function(){
        "use strict";
        //绑定模型关系
        let User=$D('user');
        let group=$D('group');
        User.belongsTo(group);
        //绑定用户-角色关系
        let Role=$D('role');let net=$D('roleUser');
        Role.belongsToMany(User, {through:net}); User.belongsToMany(Role, {through:net});
        //绑定角色-节点关系
        let Node=$D('node');let nodeRole=$D('nodeRole');
        Role.belongsToMany(Node, {through:nodeRole}); Node.belongsToMany(Role, {through:nodeRole});
    }
};