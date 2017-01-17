module.exports=function(root){
    return {
        V: '1.0'//版本
        ,SV: 0//引用版本号，用于刷新ajax缓存，空或者0会生成当前时间戳
        ,delcontrollerCache: 0 //是否清空控制器requireh缓存,开发环境开启修改conttoller文件后可以不用重启服务
        ,proxy: true//如果用nginx代理，设置为true
        ,keys: ['*&$^*&(*&$%@#@#$@!#$@%((()*()^#$%$#%@#$%@#$%$#', 'sdf454547#123sdf(8&^123369']//cookieskey
        ,port: 3000 //监听端口
        ,host:''//访问域名一般不需要配置
        ,defaultPath:""//默认访问路径
        ,apiProxy_open:true
        ,apiProxy_prefix:{} //API调用配置{servicName:prefix}
        ,body_config:{formLimit:'1mb',jsonLimit:'1mb'}
        ,db_open:true//数据模型处理中间件
        ,session_open:true//session支持，需要开启db_open
        ,session_store:'default'//session数据源 datasources.js文件定义数据源
        ,cors_open:false
        ,cors_config:{
            //     origin:'',//允许发来请求的域名，对应响应的`Access-Control-Allow-Origin`，
            //     allowMethods:'',//允许的方法，默认'GET,HEAD,PUT,POST,DELETE'，对应`Access-Control-Allow-Methods`，
            //     exposeHeaders:'',//允许客户端从响应头里读取的字段，对应`Access-Control-Expose-Headers`，
            //     allowHeaders:'',//这个字段只会在预请求的时候才会返回给客户端，标示了哪些请求头是可以带过来的，对应`Access-Control-Allow-Headers`，
            //     maxAge:'',//也是在预请求的时候才会返回，标明了这个预请求的响应所返回信息的最长有效期，对应`Access-Control-Max-Age`
            //     credentials:''//标示该响应是合法的，对应`Access-Control-Allow-Credentials`
        }
        ,logger_open:true
        ,loger_config:{
            file: root + '/file.log'
            //,size:''
        }
        ,jwt_open:true
        ,jwt_key:'shhhmkoa'//加密
        ,jwt_pem:'shhhmkoa'//解密
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