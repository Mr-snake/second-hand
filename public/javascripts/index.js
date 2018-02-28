$(function(){
	//动画初始化
	$('.nav').singlePageNav({
                offset:70
            })
    $('.navbar-header button').on('click',function(){
            $('#nav .collapse .nav').collapse('hide')
            })
    new WOW().init()
    //轮播图
	var showbanner=function(){
		$.ajax({
		type:'post',
		url:'/bannerImg',
		async:true,
		dataType:'json',
		success:function(result){
			// 实现轮播图背景的切换
			// console.log(result[1])
          var timer=null;
          clearInterval(timer);
          var i=0;
          var fn=function(){
          	$('#home').css('backgroundImage','url(../../public/upload/'+result[i].src+')')
          	  i++;
	          if(i>=result.length){
	          	i=0;
	          }
          }
          timer=setInterval(fn,5000);
		},
		error:function(err){
            console.log('错误为:'+err);
		}
	   })
	}
	showbanner();
	//事件监听：当滚动一定距离后，顶部通栏变为白色
	$(window).scroll(function(){
		var scrollTop=$(this).scrollTop;
		if(scrollTop>100){
			$('.navbar-default').css('backgroundColor','#fff')
		}
	})
	//导航栏去除active
	$('.navbar-default .navbar-nav > li > a').click(function(){
		$(this).addClass('active').parent().siblings()
		   .children('a').removeClass('active');
	})
	//登录
	// $('#default').click(function(){	
	// 	$.ajax({
	// 	type:'post',
	// 	url:'/default',
	// 	async:false,
	// 	dataType:'json',
	// 	success:function(result){
			
	// 	},
	// 	error:function(err){
            
	// 	}
	//    })
	// })
	//获取购买车数量
	var num=localStorage.getItem(2);
	$('#num').html(num)

})