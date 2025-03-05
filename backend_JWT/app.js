const userModel = require("./models/user")
const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')
app.use(cookieParser())

app.get('/', (req, res)=>{
   res.render('index')
})

app.listen(3000,()=>{
    console.log("🚀 Server is running on http://localhost:3000")
}) 