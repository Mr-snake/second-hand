$(function(){
	//显示购物车数据
    var getDatadetial=function(){
    	var table=$('.tablelist tbody')
	        $.ajax({
	            type:'post',
	            url:'/gocart',	
	            async:false,
	            success:function(result){
	            	//console.log(result)
	            	for(var i=0;i<result.length;i++){
	            	  var str='<tr>">'
	                  str+='<td class="col-md-1">';
	                  str+='<input type="checkbox" class="per-input"/>';
	                  str+='</td>';
	                  str+='<td class="col-md-3">';
	                  str+='<img src="../../public/upload/'+result[i].file+'" />';
	                  str+='<a href=""><span>'+result[i].title+'</span></a>';
	                  str+='</td>';
	                  str+='<td class="col-md-2 danjia">￥<span>'+result[i].shprice+'</span></td>';
	                  str+='<td class="col-md-2 num">';
	                  str+='<a href="javascript:void(0)" type="button" class="btn jian">-</a>';
	                  str+='<input type="text" value="1" class="count" />';
	                  str+='<a href="javascript:void(0)" type="button" class="btn add">+</a>';
	                  str+='</td>';
	                  str+='<td class="col-md-2 zhifu">￥<span class="price">'+result[i].shprice+'</span></td>';
	                  str+='<td class="col-md-2 del">';
	                  str+='<a href="">移入收藏</a>';
	                  str+='<a href="" id="'+i+'" class="del">删除</a>';
	                  str+='</td>';
	                  str+=' </tr>';
	                  table.append(str)
	            	};
	            	//获取商品数量
	            	var key=2;
	            	localStorage.setItem(key,result.length);
	            },
	                error:function(){
	                      console.log(err.status)
	                }
	        })
     }
    getDatadetial();
    //商品数量
    var low=$('.jian');
    var add=$('.add');
    low.each(function(){
	    	var _this=this;
	    	$(this).click(function(){
	    	    var inputVal=parseInt($(_this).siblings('input').val());
	    	   
	    	    inputVal--;
	    	     if(inputVal<1){
	                inputVal=1;
	    	    }
	    	    $(_this).siblings('input').val(inputVal);
	    	      var per=parseInt($(_this).parent().siblings('.danjia')
	    	          .children('span').html());
	    	      
	    	      count=inputVal*per;
	    	      $(_this).parent().siblings('.zhifu')
	    	           .children('span').html(count);
	    	           allPrice();
	        })
	})
    // 增加数量
    add.each(function(){
	    	var _this=this;
	    	$(this).click(function(){
	    	    var inputVal=parseInt($(_this).siblings('input').val());
	    	    
	    	    inputVal++;
	    	    $(_this).siblings('input').val(inputVal);
	    	    var per=parseInt($(_this).parent().siblings('.danjia')
	    	          .children('span').html());
	    	      count=inputVal*per;
	    	      $(_this).parent().siblings('.zhifu')
	    	           .children('span').html(count);
	    	      allPrice()
	        })
    })
	var allPrice=function(){
		var sum=0
		for(var i=0;i<$('.price').length;i++){
			 var price=parseInt($('.price').eq(i).html());
	         sum+=price;
		}
	    $('.all').html(sum);
	}
	allPrice();
	// 全选
	$('.allchice').click(function(){
		// alert($(this).is(':checked')) true
		if($(this).is(':checked')){
			   $('.per-input').each(function(){  
                    //此处如果用attr，会出现第三次失效的情况  
                    $(this).prop("checked",true); 
                    allPrice(); 
                    $('.fanchice').prop("checked",false); 
                });  
		}else{
			    $('.per-input').each(function(){  
                    $(this).removeAttr("checked",false);  
                });
		}
             
	})
	// 全删
	$('.fanchice').click(function(){
		if($(this).is(':checked')){
			   $('.per-input').each(function(){  
                    $(this).prop("checked",false); 
                    $('.allchice').prop("checked",false); 
                });  
		}else{
			    $('.per-input').each(function(){  
                    $(this).removeAttr("checked",true);  
                });
		}  
	})
})