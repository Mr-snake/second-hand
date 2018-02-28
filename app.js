// 入口文件的配置
// 'use strict'
// 依赖模块的导入
const express=require('express');
const static = require('express-static');
const mysql = require('mysql');
const cookieParser= require('cookie-parser');
const session = require('cookie-session');
// const session = require('express-session');
const crypto=require('crypto');

// 解析提交的数据
const bodyParser = require('body-parser');
// 上传数据
const multer = require('multer');
const multerfile = multer({ dest: './public/upload' });
const route = require('express-route');
const consolidate = require('consolidate');
const ejs = require('ejs');
// 启动服务
const app=express();
//cookie配置
app.use(cookieParser());
// app.use(function(req,res,next){
//     req.cookies=new cookieParser(req,res);
// })
// session配置
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
// app.use(function(req,res,next){
//    res.locals.nickname=req.session.nickname;
//    next()
// })
// 模板文件的配置
//for parsing multipart/form-data //需要用npm install multer@0.1.8
// app.use(multer());
app.use(multerfile.any());
app.use(bodyParser.json())// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer());
//用的模板
app.engine('html', consolidate.ejs)
//模板放在那
app.set('views', './views/');
app.set('view engine', 'html');
// 路由的配置
app.use('/adm',require('./routers/adm/admin.js')());
// app.use('/web',require('./routers/web/index.js')());
// app.use('/',function(req,res,next){
//    res.render('web/index.ejs');
// })
app.use('/',require('./routers/web/index.js')());
// 端口
var port=process.env.PORT||8888;
app.listen(port);
console.log('8080端口已经启动！')
// 静态文件托管	
app.use('/public',express.static('./public/'));
// supervisor app.js
