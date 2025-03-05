const express = require('express')
const path = require('path')

const app = express();
const PORT = 3000;
const reqCount = 0;

// 1.Setting up parser : To read frontend data properly
app.use(express.json());
app.use(express.urlencoded({extended:true}));  
// 2.Set view engine :  view engine 
app.set('view engine', 'ejs');

// 3.Set public static directory 
app.use(express.static(path.join(__dirname,'public')));   // must require path
// Render: To show a ejs page at a route as output
app.get('/home', function(req,res){
    res.render("index");
})
// single dynamic variable 
app.get("/user/:username", function(req,res){
    const username = req.params.username;
    const age = req.params.age;
    res.send(`This route is for 👉 ${username}/${age}`);
})
// mutliple dynamic variable 
app.get("/user/:username/:age", function(req,res){
    res.send(req.params); // this is reading json because of express.json()
})



//Default: setting up routes: To handle different requests
app.get('/', (req, res) => {
    res.send('express is running !');
})

// setting up server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:3000 😃`);
    console.log("See /home  on 👉 http://localhost:3000/home");
    console.log("See /user/azad  on 👉 http://localhost:3000/user/azad");
})