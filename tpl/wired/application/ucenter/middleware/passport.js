module.exports = function(app){
    $M.passport = require('koa-passport');
    let LocalStrategy = require('passport-local').Strategy; //本地登录
    $M.passport.use(new LocalStrategy(function (username, password, done){
    //查找用户
       $D('user').findOne({where:{
            password:$F.encode.md5(password),
            $or: [
                {phone:username},{email:username},{username:username}
            ]
        },raw:true}).then(function (user) {
            done(null,user);
        });

    }));
    app.use(async (ctx, next) => {
        //获取用户角色传入
        ctx.getRoles =async function(user){
            "use strict";
           let list= await user.getRoles({raw:true,  attributes: ['id', 'name','key']});
            return $F._.map(list, function(el){ return el.key; });//返回角色数组
        };
        await next();
    });

    $M.passport.serializeUser(function(user, done) {//登录成功后执行
        done(null, user)
    });

    $M.passport.deserializeUser(function(user, done) {//如果登录了每次访问执行
        done(null, user)
    });

   app.use($M.passport.initialize());
   app.use($M.passport.session());

};
