const express = require('express')
const path = require('path')
const fs = require('fs');
const { log } = require('console');
const app = express()

const PORT = 3000;

// setting parser 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// setting view engine + static folder
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "../public")))

// CRUD : Create | Read | Update or Edit | Delete or remove

// Creating Files 
app.post('/create',function(req, res){
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`, req.body.details, function(err){
        console.log(err)
        res.redirect('/')
    })
})

// Reading Files
app.get('/',(req, res)=>{
    fs.readdir(`./files`,function (err, files){
           res.render('index', {files:files})
    })
})

// Updating Files 
app.get('/update/:fileName',function(req, res){
        res.render('update',{fileName:req.params.fileName});
})
// handling form 
app.post('/update',function(req, res){
        fs.rename(`./files/${req.body.oldName}`, `./files/${req.body.newName}.txt`,
            function(err){
                res.redirect('/')
            }
        )
})

// Delete Files 
app.get('/delete/:filename',function(req, res){
       fs.unlink(`./files/${req.params.filename}`,function(err){
        res.redirect('/')
       })
})
                                  
// Setting up server 
app.listen(PORT, function(){
    console.log("🚀Server is running on http://localhost:3000")
})
