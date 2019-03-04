import express from "express"
import bodyParser from "body-parser"
import multer from "multer"
import consolidate from "consolidate"
import logger from "morgan"
const fs = require("fs")

var upload = multer({ dest: './public/upload' });

let app = express()

//中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(upload.any())
app.use(logger("combined", { stream: fs.createWriteStream('./logs/logs.log', { flags: 'a' })})) ;

app.listen(3000)

//模板引擎
app.set('view engine', 'html')
app.set('view','./views')
app.engine('html', consolidate.ejs);

//admin 路由
app.use("/admin",require("./router/admin/adminRouter"))
