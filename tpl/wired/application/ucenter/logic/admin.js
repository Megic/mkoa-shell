/**
 * Created by Administrator on 2016/12/25.
 */
module.exports ={
    '_before':async function ($this){},
    '_after':async function ($this,error){//可以自行对错误信息进行处理或者加工数据$this.POST,$this.GET
        // $this.body=error;
    },
    'changePassword':{//email/phone/username至少一个存在
        rules:{
            oldpassword:'min:5|required',
            password:'min:5|required'
        }
    },
    'setInfo':{//email/phone/username至少一个存在
        rules:{
            name:'min:2|max:20',
            username:'min:2|max:20|required_without_all:phone,email',
            email:'email|required_without_all:username,phone',
            phone:'required_without_all:username,email',
            headimgurl:'string'
        }
    }
};