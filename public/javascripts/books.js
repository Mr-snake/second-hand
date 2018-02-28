$(function(){
	//轮播图
	$('.carousel').carousel();
    
	//男生推荐
	var manbooks=function(){
		var man=$('.man');
		$.ajax({
            type:'post',
            url:'/postManbooks',
            async:false,
            success:function(result){
            	// console.log(result)
                for(var i=0;i<result.length;i++){
                	var str='<div class="col-lg-3" >';
                	       str+='<div class="media">';
                	       str+='<div class="media-left col-lg-7 col-xs-7">';
                	       str+='<a href="#" class="thumbnail">';
                	       str+='<img src="../../public/upload/'+result[i].file+'" class="media-object img-responsive">';
                	       str+='</a>';
                	       str+='</div>';
                	       str+='<div class="media-right col-lg-5 col-xs-5">';
                	       str+='<a href="#"><h5 class="media-heading">'+result[i].title+'</h5></a>';
                	       str+='<p>'+result[i].author+'</p>';
                	       str+='<a href="/getlookdet" type="button" class="btn-sm btn-primary look-det" id="'+result[i].ID+'">查看详情</a>';
                	       str+='<p class="det">'+result[i].detial+'</p >';
                	       str+='</div>';
                           str+='</div>';
                	       str+='</div>';
                	       man.append(str);
	                }
	                
	            },
	            error:function(){
                      console.log(err.status)
	            }
	         })
	}
	manbooks();
    //女生推荐
    var womenbooks=function(){
		var women=$('.girl');
		$.ajax({
            type:'post',
            url:'/postWomenbooks',
            async:false,
            success:function(result){
            	// console.log(result[5].author)
                for(var i=0;i<result.length;i++){
                	var str='<div class="col-lg-3" id="'+result[i].ID+'">';
                	       str+='<div class="media">';
                	       str+='<div class="media-left col-lg-7 col-xs-7">';
                	       str+='<a href="#" class="thumbnail">';
                	       str+='<img src="../../public/upload/'+result[i].file+'" class="media-object img-responsive">';
                	       str+='</a>';
                	       str+='</div>';
                	       str+='<div class="media-right col-lg-5 col-xs-5">';
                	       str+='<a href="#"><h5 class="media-heading">'+result[i].title+'</h5></a>';
                	       str+='<p>'+result[i].author+'</p>';
                	       str+='<a href="/getlookdet" type="button" class="btn-sm btn-primary look-det" id="'+result[i].ID+'">查看详情</a>';
                	       str+='<p class="det">'+result[i].detial+'</p >';
                	       str+='</div>';
                           str+='</div>';
                	       str+='</div>';
                	       women.append(str);
	                }
	                
	            },
	            error:function(err){
                  console.log(err.status)
	            }
	         })
	}
	womenbooks();
    //点击购买
    // console.log($('.look-det').length)
    $('.look-det').click(function(){
        var key=1;
        var id=$(this).attr('id');
        localStorage.setItem(key,id);
    })

})