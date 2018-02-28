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
var adm=require('../../models/login.js');
module.exports=function(){
	var route=express.Router();
	// 登录
	route.get('/',adm.index);
    route.get('/login',adm.loginGet);
	route.post('/login',adm.loginPost); 
	route.post('/login/scbannerImg',adm.scbannerImg);   
	route.post('/login/books',adm.books);   
	route.post('/login/common',adm.common);   
    
	return route;
}