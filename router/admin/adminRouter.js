import express from "express"
let adminRouter=express.Router()

//index 页面
adminRouter.get("/index",(request,response,next)=>{
    response.end("admin")
})


module.exports = adminRouter