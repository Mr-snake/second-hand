const express=require('express');
const mysql = require('mysql');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'secondhandnet'
});
var md=require('../models/md5.js')
// 跳转至首页
module.exports.index=function(req,res,next){
  console.log(req.session.login)
          res.render('../views/web/index.ejs',  
            { "login":req.session.login? true : false,
              "nickname":req.session.login=true? req.session.nickname : ''
            }
           )
      
  };
//获取轮图
module.exports.bannerImg=function(req,res,next){
      db.query(`SELECT src FROM banner`,function(err,data){
         if(err){
           res.status(404).send('data base').end();
         }else if(data.length==0){
            res.json('没有找到你想要的！')
         }else{
            res.json(data);
         }
      })
	};
//注册
module.exports.regist=function(req,res,next){
      res.render('../views/web/regist.ejs')
  };
module.exports.goregist=function(req,res,next){
      var usename=req.body.usename;
      var pwd=md.md5(req.body.pwd);
      db.query(`SELECT * FROM regist WHERE 
          usename='${usename}'` , function(err,data){
            if(err){
              res.status(500).send('data error');
              //查询不到则注册
            }else if(data.length==0){
              db.query(`INSERT INTO regist(usename,password) VALUES(
         '${usename}','${pwd}')`,function(err,data){
                      if(err){
                        res.status(500).send('data error');
                      }else{
                        //注册成功
                        res.json('0');
                        return false;
                      }
                  })
            }else{
            //昵称已重复
              res.json('1');
            }
      })
  }
// 登录
module.exports.login=function(req,res,next){
      var usename=req.body.usename;
      var password=req.body.password;
      password=md.md5(password);
      console.log(password)
      db.query(`SELECT * FROM regist WHERE 
          usename='${usename}' AND password='${password}'`,function(err,data){
            // console.log('err')
                if(err){
                      res.status(500).send('data error');
                }else if(data.length==0){
                      //账号密码都不对
                      res.json('0');
                      return ;
                }else{
                      //登录成功
                      req.session.login=true;
                      req.session.nickname=usename;
                      res.json('1')
                }
          })
  };
  //退出登录
// module.exports.default=function(req,res,next){
//       // res.session.clear();
//   };

module.exports.cart=function(req,res,next){
      res.render('../views/web/cart.ejs',
          { "login":req.session.login? true : false,
              "nickname":req.session.login=true? req.session.nickname : ''
            })
  };
module.exports.gocart=function(req,res,next){
  var id=req.session.nickname;
  console.log(id)
      db.query(`SELECT * FROM theorder WHERE admin='${id}'`,function(err,data){
                if(err){
                      res.status(500).send('data error');
                }else{
                      console.log(data)
                      //获取男生书籍
                      res.json(data)
                }
          })
  };
//微聊天
module.exports.weichat=function(req,res,next){
      res.render('../views/web/weichat.ejs',
          { "login":req.session.login? true : false,
              "nickname":req.session.login=true? req.session.nickname : ''
            })
  };
module.exports.infologin=function(req,res,next){
      var id=req.session.nickname;
      var date=req.body.date;
      var des=req.body.des;
      // console.log(id,date,des);
      db.query(`INSERT INTO shuoinfo(admin,date,des) VALUES(
          '${id}','${date}','${des}')`,function(err,data){
          // console.log('11111')
                if(err){
                      res.status(500).send('data error');
                }else{
                      res.json('发布成功');
                }
          })
  };
module.exports.shuoshuolist=function(req,res,next){
      // console.log(id,date,des);
      // var id='zhulei_';
      db.query(`SELECT * FROM shuoinfo`,function(err,data){
          // console.log('11111')
                if(err){
                      res.status(500).send('data error');
                }else{
                      res.json(data);
                }
          })
  };