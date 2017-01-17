/**
 * sequelize 模型定义
 */
let  DataTypes=require('sequelize');
module.exports ={
    model:{ //模型json结构
    }
    ,extend:{//模型扩展部分
        comment: '角色权限表',
        timestamps:true,
        indexes:[],
        paranoid:false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
};