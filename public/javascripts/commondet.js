$(function(){
	//获取详情页信息
	     var key=localStorage.key(2);
		 var idval= localStorage.getItem(key);
	     var data=$('#maindata');
	        $.ajax({
	            type:'post',
	            url:'/shoping',
	            data:{
	                idval:idval,
	            },
	            async:true,
	            success:function(result){
	            	console.log(result);
	            	 var str='<div class="path">'
	                  str+='<ol class="breadcrumb">'
	                  str+='<li><a href="#">解忧杂货</a></li>'
	                  str+='<li  class="active"><a href="#">'+result[0].des+'</a></li>'
	                  str+='</ol>';
	                  str+='</div>';
	                  str+='<div class="col-md-5 col-xs-6 bigimg">';
	                  str+='<a href="" class="thumbnail"> ';
	                  str+='<img src="../../public/upload/'+result[0].file+'"/>';
	                  str+='</a>';
	                  str+='<p><span><i class="glyphicon glyphicon-heart-empty"></i><a href="">关注</a></span><span><i class="glyphicon glyphicon-thumbs-up"></i><a href="">分享</a></span></p>';
	                  str+='</div>';
	                  str+='<div class="col-md-7 col-xs-6 title">';
	                  str+='<div class="">';
	                  str+='<p>'+result[0].des+'</p>';
	                  str+='<div class="panel panel-default">';
	                  str+='<div class="panel-heading">';
	                  str+='<p><em>买杂货</em>，上淮师交易网，这里更便宜！</p>';
	                  str+='</div>';
	                  str+='<div class="panel-body">';
	                  str+='<div class="yard">';
	                  str+='<p><span class="yardp">校园价</span><b>￥<i class="shprice">'+result[0].shprice+'.00</i></b><span>降价通知</span></p>';
	                  str+='<p class="op"><b class="datep">￥'+result[0].oprice+'.00</b> plus PLUS会员专享价 银牌及以上用户开通PLUS可享限时特惠 >></p>';
	                  str+='</div>';
	                  str+='<div>';
	                  str+='<div>';
	                  str+='<p><span class="yardp">促&nbsp&nbsp&nbsp销</span> <b class="xianzhi">限制</b><span>此价格不与套装优惠同时享受</span></p>';
                      str+='<p class="op"><b class="xianzhi">换购 </b> 购买1件可优惠换购热销商品 立即换购 >></p>';
	                  str+='</div>';
	                  str+='</div>';
	                  str+='</div>';
	                  str+='</div>';
	                  str+='<div><a type="button" class="btn btn-danger">加入购物车</a></div>';
	                  str+='</div>';
	                  data.append(str);
	                },
	                error:function(){
	                      console.log(err.status)
	                }
	        })
   
})