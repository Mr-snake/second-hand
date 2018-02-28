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
module.exports.common=function(req,res,next){
      res.render('../views/web/zahuo.ejs',
      	{ "login":req.session.login=="1"? true : false,
          "nickname":req.session.login!="1" ? req.session.nickname : ''
            });
  };  

module.exports.commonimd=function(req,res,next){
	var food='food';
  	 db.query(`SELECT * FROM common WHERE food='${food}'`,function(err,data){
                  if(err){
                    res.status(500).send('data error');
                  }else{
                  	// console.log(data);
                    res.json(data);
                    // return;
                  }
            })
  }
module.exports.commonshop=function(req,res,next){
	var food='foodlist';
  	 db.query(`SELECT * FROM common WHERE food='${food}'`,function(err,data){
                  if(err){
                    res.status(500).send('data error');
                  }else{
                  	// console.log(data);
                    res.json(data);
                    // return;
                  }
            })
  }
  //详情页
  module.exports.getshoping=function(req,res,next){
      res.render('../views/web/zahuodet.ejs',
         { "login":req.session.login? true : false,
              "nickname":req.session.login=true? req.session.nickname : ''
            });
  }; 
  module.exports.shoping=function(req,res,next){
  var idval=req.body.idval;
  console.log(idval)   
     db.query(`SELECT * FROM common WHERE ID='${idval}'`,function(err,data){
                  if(err){
                    res.status(500).send('data error');
                  }else{
                    // console.log(data);
                    res.json(data);
                    // return;
                  }
            })
  }