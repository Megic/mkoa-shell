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
                comment: '角色名'
        },
        key:{
            type: DataTypes.STRING(40),
            allowNull:true,
            unique:true,
            comment: '角色唯一KEY'
        },
        pearentId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
            unique:false,
            comment: '父ID'
        },
        remark:{
            type: DataTypes.STRING,
                allowNull:true,
                unique:false,
                comment: '备注'
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
        comment: '角色表',
        timestamps:true,
        indexes:[],
        paranoid:false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
};