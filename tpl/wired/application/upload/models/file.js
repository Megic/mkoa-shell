/**
 * sequelize 模型定义
 */
let  DataTypes=require('sequelize');
module.exports ={
    //  datasources:'default'//存储数据源 默认为'default'
    // ,name:'user',//模型名称 默认与文件名一致,建议保持默认
    model:{ //模型json结构
        userId: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:'0',
            unique:false,
            comment: '用户ID'
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull:false,
            defaultValue:'0',
            unique:false,
            comment: '存储路径'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull:false,
            defaultValue:'0',
            unique:false,
            comment: '文件名称'
        },
        key: {
            type: DataTypes.STRING(50),
            allowNull:false,
            defaultValue:'0',
            unique:false,
            comment: '唯一识别码'
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:'0',
            unique:false,
            comment: '分组ID'
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
            unique:false,
            comment: '文件类型 0默认 1图片 2其他'
        },
        storage: {
            type: DataTypes.STRING(20),
            allowNull:false,
            defaultValue:0,
            unique:false,
            comment: '存储源'
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
        comment: '文件上传表',
        timestamps:true,
        indexes:[],
        paranoid:false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
};