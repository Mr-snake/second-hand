$(function(){
	//轮播图
	$('.carousel').carousel();
	//秒杀
	var food=function(){
		var food=$('#foodlist');
		$.ajax({
            type:'post',
            url:'/commonimd',
            async:true,
            success:function(result){
            	console.log(result)
                for(var i=0;i<result.length;i++){
                          var str='<li class="li-pad">';
                             str+='<a href="/getshoping" id="'+result[i].ID+'">';
                             str+='<img src="../public/upload/'+result[i].file+'">';
                             str+='<p>'+result[i].des+'</p>';
                             str+='<div class="price clearfix">';
                             str+='<span class="shprice"><i>￥</i>'+result[i].shprice+'.00</span>';
                             str+='<span class="oprice"><i>￥</i>'+result[i].oprice+'.00</span>';
                             str+='</div>';
                             str+='</div>';
                             str+='</a>';
                	         str+='</li>';
                	      food.append(str);
	                }
                time(); 
	            },
	            error:function(){
                      console.log(err.status)
	            }
	         })
	}
	food();
    //限时抢
    function time(){
            var t=$('#time');
            var hour=$('#hour');
            var minute=$('#minute');
            var seconds=$('#second');
            var currtdate=new Date();
            var datelytime=new Date("2018/9/30,15:00:00");
            var second=parseInt((datelytime.getTime()-currtdate.getTime())/1000);
            //剩余天数
            var d=parseInt(second/60/60/24);
            // 剩余小时
            var h=parseInt(second/60/60%24);
            var m=parseInt(second/60%60);
            var s=parseInt(second%60);
            h=checkTime(h);
            m=checkTime(m);
            s=checkTime(s);
            if(second<=0){
                t.html('团购结束')
            }else{
                 hour.html(h);
                 minute.html(m);
                 seconds.html(s);
                 setTimeout(function(){

                         time();
                    },500);
            }
           
        }
     function checkTime(i){
            if (i<10){
                i="0" + i;
            }
            return i;
        }
    //还逛？
    var shop=function(){
        var shop=$('#shopul');
        $.ajax({
            type:'post',
            url:'/commonshop',
            async:true,
            success:function(result){
                console.log(result)
                for(var i=0;i<result.length;i++){
                          var str='<li>';
                             str+='<div class="li-pad">';
                             str+='<a href="/getshoping" id="'+result[i].ID+'">';
                             str+='<img src="../public/upload/'+result[i].file+'">';
                             str+='<p>'+result[i].des+'</p>';
                             str+='<p>￥<span>'+result[i].shprice+'.00</span></p>';
                             str+='</div>';
                             str+='<i class="search">找相似</i>';  
                             str+='</a>';  
                             str+='</li>';
                          shop.append(str);
                    }
                    //点击购买
                    // console.log($('.li-pad a').length)
                    $('.li-pad a').click(function(){
                        var key=3;
                        var id=$(this).attr('id');
                        localStorage.setItem(key,id);
                    })
                },
                error:function(){
                      console.log(err.status)
                }
             })
    }
    shop();
})