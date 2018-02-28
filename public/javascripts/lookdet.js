$(function(){
	//获取详情页信息
    var getDatadetial=function(){
	     var key=localStorage.key(0);
		 var idval= localStorage.getItem(key);
	        // console.log(idval)
	     var data=$('#adddata .val');
	        $.ajax({
	            type:'post',
	            url:'/postlookdet',
	            data:{
	                idval:idval,
	            },
	            async:false,
	            success:function(result){
	            	// console.log(result)
	            	 var str='<ol class="breadcrumb">'
	                  str+='<li><a href="#">书城小驿</a></li>'
	                  str+='<li><a href="#">'+result[0].title+'</a></li>'
	                  str+='</ol>'
	                  str+='<div class="cont">';
	                  str+='<div class="col-md-2">';
	                  str+='<img src="../../public/upload/'+result[0].file+'"/>';
	                  str+='</div>';
	                  str+='<div class="col-md-7">';
	                  str+='<div class="main">';
	                  str+='<h4>'+result[0].title+'<span></span></h4>';
	                  str+='<h5 class="pull-right hidden-xs"><i>14652</i>人看过</h5>';
	                  str+='</div>';
	                  str+=' <div class="col-md-4 ">';
	                  str+=' <p>作者：'+result[0].author+'</p><p>字数：861.5万</p>';
	                  str+=' </div>';
	                  str+='<div class="col-md-8 ">';
	                  str+='<p>分类：奇幻玄幻</p><p>状态：更新至第2886章 回到荒域</p>';
	                  str+='</div>';
	                  str+='<p><span class="shprice"><em>校园价：￥</em>'+result[0].shprice+'.00</span><span  class="shprice"><em>原价：￥</em>'+result[0].oprice+'.00</span></p>';
	                  str+=' <div class="del">';
	                  str+='<p>'+result[0].detial+'</p>';
	                  str+='</div>';
	                  str+='<div class="col-md-4">';
	                  str+='<button class="btn btn-danger">立即购买</button><button class="btn btn-danger add-p" >加入购物车</button>';
	                  str+='</div>';
	                  str+=' <div class="col-md-4"></div>';
	                  str+='<div class="col-md-4" id="share">';
	                  str+='<span><i class="iconfont icon-xingxing1"></i>收藏</span>>';
	                  str+='<span><i class="iconfont icon-fenxiang yellow"></i>分享</span>';
	                  str+='</div>';
	                  str+='</div>';
	                  str+='<div class="col-md-3">';
	                  str+='<h4>强力推荐</h4>';
	                  str+='</div>';
	                  str+='</div>';
	                  
	                  data.append(str);
	                },
	                error:function(){
	                      console.log(err.status)
	                }
	        })
     }
    getDatadetial();
    // 添加购物车
    $('.add-p').click(function(){
    	var key=localStorage.key(0);
		var idval= localStorage.getItem(key);
		 $.ajax({
	            type:'post',
	            url:'/postbooklookdet',
	            data:{
	                idval:idval,
	            },
	            async:false,
	            success:function(result){
	            	console.log(result)
		            	if(result=='1'){

	                        $('#adddata .val').html('');
	                        $('.addsc').css('display','block');
	                        $('.addsc').css('margin','50px');
		            	}else if(result=='2'){
                            $('#adddata .val').html('');
                            $('.dateadd').css('display','block');
	                        $('.dateadd').css('margin','50px');
		            	}else{

		            		$('#mod').css('display','block');
		            		$('body').css('overflow-y','hidden');
							login();
		            	}
	                },
	                error:function(){
	                      console.log(err.status)
	                }
	        })
    	// location.href='http://localhost:8888/cart';
    })
   //登录
    function login(){
		$('.login').click(function(){
			$.ajax({
			type:'post',
			url:'/login',
			data:{
				usename:$("input[name='usename']").val(),
				password:$("input[name='password']").val()
			},
			async:false,
			dataType:'json',
			success:function(result){
				if(result=='0'){
	                  alert('您的昵称和密码有错误哦！')
				}else{
	                  alert('登录成功,请添加购物车')
	                  window.location='/getlookdet';
				}
			},
			error:function(err){
	            console.log('错误为:'+err.status);
			}
		   })
		})
    }
})