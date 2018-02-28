// 后台管理路由
const express=require('express');
const mysql = require('mysql');
const fs=require('fs');
const path=require('path');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'secondhandnet'
});
var web=require('../../models/index.js');
var book=require('../../models/book.js');
var live=require('../../models/live.js');
var common=require('../../models/common.js');
module.exports=function(){
	var route=express.Router();
	// 登录
	route.get('/',web.index);
	route.post('/bannerImg',web.bannerImg);  
  route.get('/regist',web.regist);
  route.post('/goregist',web.goregist);
  //跳蚤市场
  // 书城小驿路由
  route.get('/books',book.getbooks);
  route.post('/postManbooks',book.postManbooks);
  route.post('/postWomenbooks',book.postWomenbooks);
  // book详情
  route.get('/getlookdet',book.getlookdet);
  route.post('/postlookdet',book.postlookdet);
  // 添加购物车
  route.post('/postbooklookdet',book.postbooklookdet);
  //购物车
  route.get('/cart',web.cart);
  route.post('/gocart',web.gocart);
  /*书城小驿路由结束*/

  //良品铺子
  route.get('/live',live.live);


  // 解忧杂货
  route.get('/common',common.common);
  route.post('/commonimd',common.commonimd);
  route.post('/commonshop',common.commonshop);
  route.get('/getshoping',common.getshoping);
  route.post('/shoping',common.shoping);
  //微聊天
  route.get('/weichat',web.weichat);
  route.post('/infologin',web.infologin);
  route.post('/shuoshuolist',web.shuoshuolist);
  //登录
  route.post('/login',web.login);
  // route.post('/defeat',web.defeat);
	return route;
}