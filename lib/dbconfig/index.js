import mysql from 'mysql'


//创建连接
let connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"web_sys",
    port:"3306"
})

connection.connect()


 function querySql(sql,callback){
    connection.query(sql,function(error, results){
        if(error){
            callback(error.message)
            return;
        }else{
            callback(results)
        }

    })
}

module.exports = querySql




