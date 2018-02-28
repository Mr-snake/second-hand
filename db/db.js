module.exports.db=function(){
 const mysql = require('mysql');
	var db = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  database : 'secondhandnet'
	});
}
