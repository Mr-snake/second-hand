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
// 跳转至首页
module.exports.index=function(req,res,next){
       res.render('../views/adm/login.ejs');
	};
// 跳转至后台登录页
module.exports.loginGet=function(req,res,next){
    if(req.session.login){
       // res.render('admin.ejs',{data});
       // res.send('你好！'+req.session.usename)
            if (req.query.act == 'del') {
                  db.query(`SELECT * FROM banner WHERE ID=${req.query.id}`, (err, data) => {
                      if (err) {
                          console.error(err)
                          res.status(500).send('database error').end();
                      } else {
                          fs.unlink('public/upload/' + data[0].src, (err, data) => {
                              if (err) {
                                  console.error(err)
                                  res.status(500).send('database error').end();
                              } else {
                                  db.query(`DELETE FROM banner WHERE ID=${req.query.id}`, (err, data) => {
                                      if (err) {
                                          console.error(err)
                                          res.status(500).send('database error').end();
                                      } else {
                                          res.redirect('/adm/login');
                                      }
                                  })
                              }
                          })
                      }
                  })
            } else{
              	// 进入页面显示上传的数据
              	 db.query(`SELECT * FROM banner`, (err, data) => {
                        if (err) {
                        	console.log(err)
                            res.send('database error');
                        } else {
                            res.render('../views/adm/admin.ejs',{data});
                        }
                    })
              }
    }else{
    	// 没有验证则返回重新登录
       res.redirect('/adm');
       return 
    }
  }
  //登录
module.exports.loginPost=function(req,res,next){
	    // express deprecated req.param(name): Use req.params, req.body, or req.query 
        var usename=req.body.usename;
        var password=req.body.password;
        var repassword=req.body.repassword;
        var data1=[];
	        	db.query(`SELECT * FROM admin WHERE usename='${usename}' 
              AND password='${password}' AND	repassword='${repassword}'`
              ,(err,data)=>{
	             if(err){
	             	res.status(404).send('database error');
	             }else{
  	             	if(data.length==0){
  	             		res.json('您没有管理员权限');
                    return false;
  	             	}else{
  	             	  // res.json('您已经成功登录！');
                    req.session.login=true;
                    req.session.usename=usename;
                    // res.setHeader('Cache-Control', 'no-cache');
                    // 重定向是不能和ajax同时使用的！！！  
                    res.redirect('/adm/login');
  	             	}
	              }
               })
	      }
 //获取轮播图
module.exports.scbannerImg=function(req,res,next){
		// [ { fieldname: 'text',
  //   originalname: 'SFSantaCon_ZH-CN11213292356_1920x1080.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: './public/upload',
  //   filename: '44687cbca53c4a6b22790901dbeb6006',
  //   path: 'public\\upload\\44687cbca53c4a6b22790901dbeb6006',
  //   size: 347383 } ]
          console.log(req.files);
          console.log(req.body);
            var title=req.body.title;
            var des=req.body.des;
            var ext = path.parse(req.files[0].originalname).ext;
            console.log(req.files)
            var oldfile = req.files[0].path;
            var newfile = req.files[0].path + ext;
            var file = req.files[0].filename + ext;
             // console.log(file);
            fs.rename(oldfile,newfile,(err)=>{
              if (err) {
                    res.status(404).send('error').end()
                } else {
                    // console.log(f1)
                    // var str = req.files[0].filename + path.ext(req.files[0].originalname)
                    db.query(`INSERT INTO banner(title,description,src) VALUES(
                    '${title}','${des}','${file}')`, (err, data) => {
                        if (err) {
                        	console.log(err)
                            res.send('database error');
                        } else {
                        	res.redirect('/adm/login')
                            // res.render('admin.ejs',{data});
                        }
                    })
                }
             })
          }
//书城小驿
module.exports.books=function(req,res,next){
  // title: 'fasdfasf',
  // author: 'fasdfds',
  // des: 'dfasfsadfsaf',
  // shprice: 'dfsafsa',
  // oprice: 'fdasfdfadsfdsa',
  // optionsRadios: 'option1' 
            var title=req.body.title;
            var author=req.body.author;
            var des=req.body.des;
            var shprice=req.body.shprice;
            var oprice=req.body.oprice;
            var optionsRadios=req.body.optionsRadios;

            var ext = path.parse(req.files[0].originalname).ext;
            console.log(req.files)
            var oldfile = req.files[0].path;
            var newfile = req.files[0].path + ext;
            var file = req.files[0].filename + ext;
             // console.log(file);
            fs.rename(oldfile,newfile,(err)=>{
              if (err) {
                    res.status(404).send('error').end()
                } else {
                    console.log(req.body)
                    // var str = req.files[0].filename + path.ext(req.files[0].originalname)
                    db.query(`INSERT INTO books(title,author,detial,oprice,shprice,typexy,file) VALUES('${title}',
                      '${author}','${des}','${oprice}','${shprice}','${optionsRadios}','${file}')`, (err, data) => {
                        if (err) {
                          console.log(err)
                            res.send('database error');
                        } else {
                          res.redirect('/adm/login')
                            // res.render('admin.ejs',{data});
                        }
                    })
                }
             })
          }
//解忧杂货
module.exports.common=function(req,res,next){
            var des=req.body.des;
            var shprice=req.body.shprice;
            var oprice=req.body.oprice;
            var optionsRadios=req.body.optionsRadios;
            var ext = path.parse(req.files[0].originalname).ext;
            // console.log(req.files)
            var oldfile = req.files[0].path;
            var newfile = req.files[0].path + ext;
            var file = req.files[0].filename + ext;
             // console.log(file);
            fs.rename(oldfile,newfile,(err)=>{
              if (err) {
                    res.status(404).send('error').end()
                } else {
                    console.log(req.body)
                    // var str = req.files[0].filename + path.ext(req.files[0].originalname)
                    db.query(`INSERT INTO common(des,oprice,shprice,file,food) VALUES(
                      '${des}','${oprice}','${shprice}','${file}','${optionsRadios}')`, (err, data) => {
                        if (err) {
                          console.log(err)
                            res.send('database error');
                        } else {
                          res.redirect('/adm/login')
                            // res.render('admin.ejs',{data});
                        }
                    })
                }
             })
          }