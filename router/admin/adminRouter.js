import express from "express"
let adminRouter=express.Router()


import db from './../../lib/dbconfig'

//index 页面
adminRouter.get("/index",(request,response,next)=>{

    //准备sql语句
    let meunSql ="SELECT * FROM `sys_menu` WHERE `m_status`=1 ORDER BY `m_orderby`" ;
    let webInfoSql ="SELECT * FROM `websiteinfo`"
   

    db.query(meunSql + ";" + webInfoSql, [], function (error,results, fields) {
       
        response.render("./admin/index.html", { meun: results[0], webInfo: results[1]})
    })
    
 
})


adminRouter.get("/meun", (request, response, next)=>{
    response.render("./admin/meun.html", {  })
})

adminRouter.post("/getmeun", (request, response, next) =>{
    let meunSql = "SELECT * FROM `sys_menu`  ORDER BY `m_orderby`";

    

    db.query(meunSql, [], function (error, results, fields){
       
        console.log(results)
        let dataObj = {
            "code": 0
            , "msg": ""
            , "count": results.length
            , "data": results
        }

        if (!error) {
            response.json(dataObj)
        }
    })

    

   
    
})


module.exports = adminRouter