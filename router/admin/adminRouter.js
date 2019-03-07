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

adminRouter.post("/deleteByMeunId", (request, response, next) =>{

    let meunSql ="UPDATE `sys_menu` SET `m_status`=0 WHERE `m_id`=?"

    db.query(meunSql, [request.body.mId], function (error, results, fields) {
        //判断受影响行数
        if (!error && results.affectedRows>=1){
            response.json({"msg":"删除成功","status":1})
        }else{
            response.json({ "msg": "删除失败", "status": -1, error: error})
        }
    })
    
})

adminRouter.post("/editByMeun", (request, response, next) => {
    let meunSql = "UPDATE `sys_menu` SET  `m_name`=?, `m_number`=? ,`m_link`=?, `m_status`=?,`m_parent`=?,`m_icon`=?,`m_orderby`=?  WHERE `m_id`=?"
    let params = [
        request.body.m_name,
        request.body.m_number,
        request.body.m_link,
        request.body.m_status,
        request.body.m_parent,
        request.body.m_icon,
        request.body.m_orderby,
        request.body.m_id,
    ]

    console.log(request.body)
    // db.query(meunSql, params, function (error, results, fields) {
    //     //判断受影响行数
    //     if (!error && results.affectedRows >= 1) {
    //         response.json({ "msg": "修改成功", "status": 1 })
    //     } else {
    //         response.json({ "msg": "修改失败", "status": -1, error: error })
    //     }
    // })

})

adminRouter.post("/editBysStatus", (request, response, next) =>{

    let meunSql="UPDATE `sys_menu` SET`m_status` = ? WHERE`m_id` = ?"
    let params = [
        request.body.status,
        request.body.mId
    ]
    db.query(meunSql, params, function (error, results, fields) {
        //判断受影响行数
        if (!error && results.affectedRows >= 1) {
            response.json({ "msg": "修改成功", "status": 1 })
        } else {
            response.json({ "msg": "修改失败", "status": -1, error: error })
        }
    })

})

adminRouter.get("/addMeun", (request, response, next) =>{

    response.render("./admin/addMeun.html", {})
   
})

adminRouter.post("/addMeun", (request, response, next) =>{
    let meunSql = "INSERT INTO `sys_menu`(`m_name`,`m_number`,`m_link`,`m_status`,`m_parent`,`m_icon`,`m_orderby`) VALUE (?,?,?,?,?,?,?)"
    let params = [
        request.body.m_name,
        request.body.m_number,
        request.body.m_link,
        request.body.m_status,
        request.body.m_parent,
        request.body.m_icon,
        request.body.m_orderby,
    ]


    db.query(meunSql, params, function (error, results, fields){
        if (!error && results.affectedRows >= 1) {
            response.json({ "msg": "添加成功", "status": 1 })
        } else {
            response.json({ "msg": "添加失败", "status": -1, error: error })
        }

    })
})

module.exports = adminRouter