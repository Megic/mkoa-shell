module.exports=function(root){
    return {
        V: '1.0'//版本
        ,SV: 0//引用版本号，用于刷新ajax缓存，空或者0会生成当前时间戳
        ,delcontrollerCache: 1 //是否清空控制器requireh缓存,开发环境开启修改conttoller文件后可以不用重启服务
        ,proxy:false//如果用nginx代理，设置为true
        ,port: 3000 //监听端口
        ,host:''//访问域名一般不需要配置
        ,defaultPath:""//默认访问路径
        ,apiProxy_open:true
        ,install_check:true //是否检测install/index文件，并执行
        ,apiProxy_prefix:{} //API调用配置{servicName:prefix}
        ,body_config:{formLimit:'1mb',jsonLimit:'1mb'}
        ,db_open:true
        ,session_open:false
        ,session_store:'default'//session数据源 datasources.js文件定义数据源
        ,cors_open:false
        ,logger_open:true
        ,loger_config:false
        ,jwt_open:true
        ,rewrite_open:false
        ,cache_open:false
        ,cache_store:'cache'
        ,logic_open:true //自动校验数据
        ,static_open:true
        ,lang_open:true
        ,lang_default:'zh-cn'
        ,lang_cookie: "mkoa_locale"//存放语言的 cookie 名称
        ,view_open:true
        ,view_engine:'ejs'//视图解析
        ,socket_open:false
        ,socket_config:root + '/config/socket'//socket配置文件路径
    }
};