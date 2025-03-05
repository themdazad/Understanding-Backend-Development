const express = require("express"); // To use express
const app = express();
const path = require('path')
const mongoose = require("mongoose"); // To use mongoose, an ODM for mongoDBconst userModel = require("./usermodel"); // Importing model created in usermodel.js
const userModel = require("./models/user")
const dotenv = require("dotenv"); //To access environment variable
dotenv.config();
const port =  process.env.PORT || 3000


// middleware and view setup
app.set("view engine", "ejs")
app.use(express.json())  // to read json
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public'))) // to use public folder for  


  app.get("/", (req, res) => {
    res.render('index')
  })
  
  
  // Create 
  app.post("/create", async (req, res) => {
   let {name, email, image_url} = req.body;  //destructuring
   await userModel.create({
      name:name,
      email:email,
      image_url:image_url
  })
  console.log('User Created!')
  res.redirect('/read')
  })

  // Reading Database and sending to read page 
  app.get("/read",async (req, res) => {
    // let userData = await userModel.findOne();
    const allUsers = await userModel.find();
    res.render('read', {users:allUsers})
  })

  // delete 
  app.get("/delete/:_id",async (req, res) => {
    await userModel.findOneAndDelete({_id:req.params._id})
    res.redirect('/read')
  })
  // edit
  app.get("/edit/:_id",async (req, res) => {
   let cardData =  await userModel.findOne({_id:req.params._id})
    await userModel.findOneAndUpdate({_id:req.params._id},{})
    res.render('edit', {data:cardData})
  })
  // update
  app.post("/update/:_id",async (req, res) => {
    const {name,email,image_url} = req.body;
    const cardData = await userModel.findOneAndUpdate({_id:req.params._id},{name,email,image_url}, {new:true})
    res.redirect('/read')
  })


app.listen(port, () => {
  console.log(`Express is listening.`);
});
``