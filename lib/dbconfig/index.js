import mysql from 'mysql'


//创建连接
let pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"web_sys",
    port:"3306",
    multipleStatements: true //执行多条sql语句查询
})


exports.query = function (sql, arr, callback){
     //建立链接
    pool.getConnection(function (err, connection) {
        if (err){
            callback(err, null, null)
        }else{
            connection.query(sql, arr, function (err, results, fields){
                callback(err,results, fields)
            })
            pool.releaseConnection(connection)
        }
    });
  
}




