/**
 * sequelize 模型定义
 */
let  DataTypes=require('sequelize');
module.exports ={
    //  datasources:'default'//存储数据源 默认为'default'
    // ,name:'user',//模型名称 默认与文件名一致,建议保持默认
    model:{ //模型json结构
        name:{
            type: DataTypes.STRING(50),
                allowNull:true,
                unique:false,
                comment: '组名'
        },
        titlepic:{
            type: DataTypes.STRING,
            allowNull:true,
            unique:true,
            comment: '标识/图地址'
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
        comment: '用户组表',
        timestamps:true,
        indexes:[],
        paranoid:false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
};