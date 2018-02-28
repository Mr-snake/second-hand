$(function(){
	$('#myTabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})
	
	// $('#btn').click(function(){
	// 	$.ajax({
	// 	type:'post',
	// 	url:'/adm/login/scbannerImg',
	// 	data:{
 //            title:$('.title').val(),
 //            des:$('.des').val()
	// 	},
	// 	dataType:'json',
	// 	success:function(result){
 //           $(this).siblings('span').html('上传成功！')
	// 	},
	// 	error:function(err){
 //            console.log('错误为:'+err.message+err.status);
	// 	}
	//    })
	// })
})
