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
module.exports.live=function(req,res,next){
      res.render('../views/web/live.ejs',
         { "login":req.session.login? true : false,
              "nickname":req.session.login=true? req.session.nickname : ''
            })
};