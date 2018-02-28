exports.md5=function(pwd){
	const crypto=require('crypto');
	var md5=crypto.createHash('md5');
	var pwd=md5.update(pwd).digest('base64');
	return pwd;
}