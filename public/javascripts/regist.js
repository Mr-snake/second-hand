$(function(){
	//注册
	$('#imd_regist').click(function(){
		$.ajax({
            type:'post',
            url:'/goregist',
            async:false,         //若为true,则报错，err.status返回0
            data:{
            	usename:$('.usename').val(),
            	pwd:$('.pwd').val()
            },
            success:function(result){
            	//注册成功
                 if(result=='0'){
                    alert('已成功注册！请去登录');
                     //  ajax直接使用document.location.href='xxx.html'不能跳转存在必然问题
					// 首先你点击了submit，它会提交表单，但是由于
					// 你用了ajax的同步操作（也就是async:false），submit的提交被阻塞，
					// ajax先执行，这个时候，如果你在ajax的回调函数（如：success）
					// 中写了document.location.href='xxx.html'，它是执行了，的确是去执行了跳转的，
					// 于是ajax完成了，那接下来就要把刚才的submit提交的请求完成，这时候又会调回原界面，
					// 让你觉得document.location.href='xxx.html'没有跳转

                       // window.location.href无法实现跳转，a标签href属性值实现跳转跳转
                   	   // window.location.href('http://localhost:8888/');
                   	   // return true;
                 }else{
                //昵称已存在
                   alert('昵称已存在，请重新输入！')
                 }
            },
            error:function(err){
                 alert('查询不到您想要的结果！')
            }
		})
	})
})