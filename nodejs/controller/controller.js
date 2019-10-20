'use strict';

var response = require('../entity/res');
var connection = require('../config/conn');
var quesen=require('../sequence/Quesen');
var oradb= require('oracledb');
oradb.outFormat = oradb.OUT_FORMAT_OBJECT;
var oracon=require('../config/oracleConnection');

exports.users = function(req, res) {
    connection.query('SELECT * FROM person', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.findUsers = function(req, res) {
    
    var user_id = req.params.user_id;

    connection.query('SELECT * FROM person where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};


exports.createUsers = function(req, res) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('INSERT INTO person (first_name, last_name) values (?,?)',
    [ first_name, last_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.updateUsers = function(req, res) {
    
    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('UPDATE person SET first_name = ?, last_name = ? WHERE id = ?',
    [ first_name, last_name, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    
    var user_id = req.body.user_id;

    connection.query('DELETE FROM person WHERE id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

exports.getPerson= function(req,res){
	var req_id=req.body.user_id;
	var sql="call getPerson(?)";
	connection.query(sql,[req_id],function(error, rows, fields){
		if(error){
            console.log(error);
        } else{

            response.ok(rows[0], res);
        }
	});
};

// code dibawah menggunakan koneksi oracle
// ingat untuk menggunakan async function untuk oracle db
exports.getCustomer=async function(req,res){
	try{
		let con = await oradb.getConnection(oracon.conn);
		var result = await con.execute(quesen.getCustomer);
		response.ok(result.rows, res);
	}
	catch(error){
		console.log(error);
	}
};

exports.findCustomer= async function(req,res){
	var custId=req.body.cust_id;
	try{
		let con = await oradb.getConnection(oracon.conn);
		var result = await con.execute(quesen.findAcustomer,{cust_id:custId});
		response.ok(result.rows, res);
	}
	catch(error){
		console.log(error);
	}
}

exports.insertCustomer= async function(req,res){
    var params={
        custId:req.body.custId,
        custName:req.body.custName,
        city:req.body.city
    };

    try{
        let con = await oradb.getConnection(oracon.conn);
        var result = await con.execute(quesen.insertCustomer,{cust_id:params.custId,
            cust_name:params.custName,
            city:params.city
            },{
                autocommit:false,
                resultSet:false
            });
        con.commit(function(err){
            if(err){
                console.log("err");
            }else{
                console.log("commited");
            }
        });
        response.ok(result.rows, res);
    }
    catch(error){
        console.log(error);
    }

}