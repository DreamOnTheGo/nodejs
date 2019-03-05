import express from "express"
let adminRouter=express.Router()


import querySql from './../../lib/dbconfig'

//index 页面
adminRouter.get("/index",(request,response,next)=>{

    //准备sql语句
    let meunSql ="SELECT * FROM `sys_menu` WHERE `m_status`=1"
    querySql(meunSql,function(data){
        console.log(data)
        response.render("./admin/index.html", {meun: data})
    })
    
 


    response.render("./admin/index.html",{})
})


module.exports = adminRouter