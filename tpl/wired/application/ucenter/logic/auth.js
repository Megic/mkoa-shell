/**
 * Created by Administrator on 2016/12/25.
 */
module.exports ={
    '_before':async function ($this){},
    '_after':async function ($this,error){//可以自行对错误信息进行处理或者加工数据$this.POST,$this.GET
        // $this.body=error;
    },
    'login':{
        rules:{username:'required',password:'required|min:5'},//校验
        messages:{
            required: '请填写完整'
        }//提示
    },
    'register':{//email/phone/username至少一个存在
        rules:{
            name:'min:2|max:20',
            username:'min:2|max:20|required_without_all:phone,email',
            email:'email|required_without_all:username,phone',
            phone:'required_without_all:username,email',
            password:'min:5|required',
            headimgurl:'string'
        }
    }
};