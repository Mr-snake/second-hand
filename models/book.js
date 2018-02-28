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
// 跳蚤市场
module.exports.getbooks=function(req,res,next){
      res.render('../views/web/books.ejs',
        { "login":req.session.login? true : false,
              "nickname":req.session.login=true? req.session.nickname : ''
            })
  };
//男生推荐
module.exports.postManbooks=function(req,res,next){
      var type='男' ;
      db.query(`SELECT * FROM books WHERE typexy='${type}'`,function(err,data){
                if(err){
                      res.status(500).send('data error');
                }else{
                      // console.log(data[0].author)
                      //获取男生书籍
                      res.json(data)
                }
          })
}

//女生推荐
module.exports.postWomenbooks=function(req,res,next){
      var type='女' ;
      db.query(`SELECT * FROM books WHERE typexy='${type}'`,function(err,data){
                if(err){
                      res.status(500).send('data error');
                }else{
                      // console.log(data[0].author)
                      //获取男生书籍
                      res.json(data)
                }
          })
}
// 详情页
module.exports.getlookdet=function(req,res,next){
      res.render('../views/web/shoppingdetial.ejs', 
         { "login":req.session.login? true : false,
              "nickname":req.session.login=true? req.session.nickname : ''
            });
  };
module.exports.postlookdet=function(req,res,next){
        var idval=req.body.idval;
        // console.log(idval);
        db.query(`SELECT * FROM books WHERE ID='${idval}'`,function(err,data){
                  if(err){
                        res.status(500).send('data error');
                  }else{
                    res.json(data);
                    // return;
                  }
            })
}
// book添加到数据库在订单页面显示
module.exports.postbooklookdet=function(req,res,next){
      // console.log(req.session.nickname)
      var idval=req.body.idval;
      // console.log(idval)
      if(req.session.nickname!=undefined){
        // 用户存在，查询book信息
          db.query(`SELECT * FROM books WHERE ID='${idval}'`,function(err,data){
                if(err){
                      res.status(500).send('data error');
                }else{
                      console.log(data)
                      //获取男生书籍
                      var id=req.session.nickname;
                      var title=data[0].title;
                      var file=data[0].file;
                      var shprice=data[0].shprice;
                      // 获得书籍信息去订单数据库查询该用户是否已经添加过此产品
                      db.query(`SELECT * FROM theorder WHERE  title='${title}' AND admin='${id}'`,function(err,data){
                    
                            if(data==''){
                              // console.log(2222)
                              db.query(`INSERT INTO theorder(admin,file,title,shprice) VALUES(
                               '${id}','${file}','${title}','${shprice}')`,function(err,data){
                                   if(err){
                                      res.status(500).send('data error');
                                   }else{
                                      // var data1=[];
                                      var message='1';

                                      res.json(message);
                                      return;
                                   }
                               })
                            }else{   
                                    console.log('1111')
                                     var message='2';

                                      res.json(message);
                            }

                      })
                }
          })
      }else{
              var message='-1';
              res.json(message)
      }
      
  };