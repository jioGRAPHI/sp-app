const mysql = require('mysql');
var connection;

//make connection
if (process.env.JAWSDB_MARIA_URL){
	connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
	console.log('Host DB');
}else{
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'b1gheadJigz0116',
		database: 'news_aggregator',
		multipleStatements: true,
		connectTimeout: 100000
	});
	console.log('Local DB');
}

connection.connect((err)=>{
	console.log('DB connecting...');
	if(!err)
		console.log('DB connection succeeded');
	else
		console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});



// Export connection for our ORM to use.
module.exports = connection;