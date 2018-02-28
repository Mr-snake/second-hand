$(function(){
    	   var table=$('.item')
    	   $('.btn').click(function(){
    	   	    var inputval=$('#exampleInputEmail1').val();
    	   	    var date=new Date().getTime();
    	   	    $.ajax({
		            type:'post',
		            url:'/infologin',
		            data:{
                        date:date,
                        des:inputval
		            },	
		            async:true,
		            success:function(result){
		            	alert(result)
		            	
		            },
		            error:function(){
		                 console.log(err.status)
		            }
	            })
	            $('#exampleInputEmail1').val('');
	            location.href="http://localhost:8888/weichat";
    	   })
	       
   //获取说说信息
    Date.prototype.Format = function (fmt) {  
		    var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "h+": this.getHours(), //小时 
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		    };
		    if (/(y+)/.test(fmt)) 
		    	fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
		    		     .substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}
    var getDatadetial=function(){
	     var data=$('#list');
	        $.ajax({
	            type:'post',
	            url:'/shuoshuolist',
	            async:false,
	            success:function(result){
	            	// console.log(result)
	            	for(var i=0;i<result.length;i++){
	            		var date=result[i].date;
	            		var d=new Date();
	            		d.setTime(date);
	            		var day=d.Format("yyyy-MM-dd,h:m");
	            		var str='<li class="clearfix">';
		                  str+='<div>';
		                  str+='<div class="col-md-2">'
		                  str+='<img src="../../public/images/logo3.png" alt="" />'
		                  str+='</div>';
		                  str+='<div class="col-md-10">';
		                  str+='<a href="">'+result[i].admin+'<span class="pull-right time">'+day+'</span></a>';
		                  str+='<p>'+result[i].des+'</p>';
		                  str+='</div>';
		                  str+='</div>';
		                  str+='</li>';
		                  // 开头插入内容
		                  data.prepend(str);
	            	  }
	                },
	                error:function(){
	                      console.log(err.status)
	                }
	        })
     }
    getDatadetial();
   //说说滚动
   // setInterval(shuoScroll(),200);
   // var ul=$('#list');
   // var num=0;
   // function shuoScroll(){
   //       num--;
   //       ul.css('top','num')
   // }
  //  $('.login').click(function(){
		// 	$.ajax({
		// 	type:'post',
		// 	url:'/login',
		// 	data:{
		// 		usename:$("input[name='usename']").val(),
		// 		password:$("input[name='password']").val()
		// 	},
		// 	async:false,
		// 	dataType:'json',
		// 	success:function(result){
		// 		if(result=='0'){
	 //                  alert('您的昵称和密码有错误哦！')
		// 		}else{
	 //                  alert('登录成功,请发布');
	 //                  window.location='/weichat';
		// 		}
		// 	},
		// 	error:function(err){
	 //            console.log('错误为:'+err.status);
		// 	}
		//    })
		// })
})