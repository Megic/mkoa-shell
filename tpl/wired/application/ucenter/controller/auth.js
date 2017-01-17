/**
 * Created by megic on 2015/11/28 0028.
 */
module.exports = function ($this) {
    let action = {};
    
    action['_before'] = function *() {//先执行的公共函数
        "use strict";

    };
    action['_after'] = function *() {//后行的公共函数
        //console.log('公共头部');
    };

    //创建用户token
    function getUserToken(userinfo,$this){
        let expiresIn= Math.floor(Date.now() / 1000) + (60*60);//1小时过期
        return [$this.jwtSign({user:userinfo,exp:expiresIn}),expiresIn];
    }
    //创建刷新token
    function getRefreshToken(uid,$this){
        return $this.jwtSign({uid:uid,type:'refresh',exp:Math.floor(Date.now() / 1000) + (60*60*24*30)});//30天过期;
    }
    //整理token/会话保存信息
    function getLoginData(uid,user,roles){
        let basedata= {
            id:uid,
            userInfo:{id:uid,name:user.name,headimgurl:user.headimgurl,groudId:user.groudId},//基本信息
            roles: roles
        };
        "use strict";
        let tonkenArr=getUserToken(basedata,$this);
        let refresh_token=getRefreshToken(uid,$this);//30天过期
        basedata.auth={//token信息
            token:tonkenArr[0],
            refresh_token:refresh_token,
            expires_in:tonkenArr[1]
        };

        return basedata;
    }

    action['phoneCaptcha']=function() {//发送手机验证码
        //let num=parseInt(Math.random()*900000+100000);
        let phone=$this.POST['phone'];
        let num=123456;//测试
        //发送验证码到手机
        $this.session.ucenter_captcha = num;//记录session
        $this.success();
    };
    //**************************** 简易png验证码
    let Captchapng = require('captchapng');
    action['captcha']=function (){//图片验证码
        let num=parseInt(Math.random()*9000+1000);
        let p = new Captchapng(80,30,num); // width,height,numeric captcha
        p.color(86, 172, 232);  // First color: background (red, green, blue, alpha) //别急演示
        p.color(255, 255, 255, 255); // Second color: paint (red, green, blue, alpha)
        let img = p.getBase64();
        let imgbase64 = new Buffer(img,'base64');
        $this.session.ucenter_captcha = num;//记录session
        $this.type = 'image/png';
        $this.body = imgbase64;
    };//****************************
    //****************************
    action['checkLogin']=function (){//判断用户是否已登录
        if ($this.isAuthenticated()){
            $this.success(this.req.user); //已经登录
        }else{
            $this.error(401);
        }
    };//****************************
    action['register'] = async function () {
        let needCheck=1;//是否需要审核

        if ($this.isAuthenticated()) {
            $this.error('您已登陆，退出登陆后再操作！'); //已经登录
            return;
        }

       //验证码检测
        if(parseInt($this.POST['captcha'])!=$this.session.ucenter_captcha){
            $this.error($this.langs['captchaError']);return;
        }else{
            $this.session.ucenter_captcha=null;
        }

        $this.POST['status']=needCheck?0:1;
                let newuser;
                let orlist=[];
                //检查手机、邮箱、账户名是否重复
                if($this.POST['phone'])orlist.push({phone: $this.POST['phone']});
                if($this.POST['email'])orlist.push({email: $this.POST['email']});
                if($this.POST['username'])orlist.push({username: $this.POST['username']});
                let user = await $D('user').findOne({
                    where: {$or:orlist}
                });
                if (!user) {//不存在重复信息，注册新用户
                    $this.POST['password'] = $F.encode.md5($this.POST['password']);//加密密码
                    $this.POST['sessionId']=$this.cookies.get($C.session_config['key']);//记录sessionId
                    newuser = await $D('user').build($this.POST).save({fields:['name','phone','email','username','headimgurl','password','sessionId','groupId','status']});

                    let role=await $D('role').findById(1);//默认角色
                    await newuser.addRole(role);//分配管理角色

                    let authData;
                    if(!needCheck){//是否注册后直接登录
                        authData=getLoginData(newuser.id,newuser,[role]);
                        await $this.logIn(authData);
                    }//登录注册用户
                    $this.success({needCheck:needCheck,loginData:authData});
                } else {
                    $this.error($this.langs['doubleUser']);//用户重复
                }

    };
    //****************************
    action['login']= async function (){//用户登录
        //验证码检测
        if(parseInt($this.POST['captcha'])!=$this.session.ucenter_captcha){
            $this.error($this.langs['captchaError']);return;
        }else{$this.session.ucenter_captcha=null;}

        if ($this.isAuthenticated()){
            $this.error($this.langs['hasLogin']);//已经登录
        }else {
            await  $M.passport.authenticate('local',async function (user, info, status) {
                if(!user){ $this.error($this.langs['errorInfo']); return;}
                if (user.status == 1){//状态正常
                    let nuser=await $D('user').findById(user.id);
                    nuser.sessionId=$this.cookies.get($C.session_config['key']);
                    nuser.save();
                    let roles=await $this.getRoles(nuser);
                    let authData=getLoginData(nuser.id,nuser,roles);
                    $this.logIn(authData);
                    $this.success(authData);
                } else {
                    $this.error($this.langs['backStatus']);
                }
            })($this);
        }

    };//***************************************************
    action['lgout']=function (){//退出登录
        $this.logout();
        $this.error(401);//退出成功，返回401
    };//***************************************************

    //刷新token
    action['refresh']=async function (){
        let res=$this.jwtRefresh();
        if(res.type=='refresh'){
           let user=  await $D('user').findById(res.uid);
           let roles=await $this.getRoles(user);
           let authData=getLoginData(res.uid,user,roles);
            $this.success(authData.auth);
        }else{
            $this.error('token不正确')
        }
    };
    return action;
};