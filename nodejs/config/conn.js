var mysql = require('mysql');
var oradb= require('oracledb');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;


