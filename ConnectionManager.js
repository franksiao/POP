var mysql = require('mysql');
var config = require('./config.json');

var pool = mysql.createPool({
	connectionLimit: 20,
	host: config.db_host,
	user: config.db_user,
	password: config.db_password,
	port: config.db_port,
	database : 'opt',
	debug: false
});

exports.setup = function(router) {
	router.use(function makeConnection(req, res, next) {
		req.connection = pool;
		next();
	});
}

exports.getPool = function() {
	return pool;
}
