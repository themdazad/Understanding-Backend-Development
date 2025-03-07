const userModel = require("./models/user");
const postModel = require("./models/post");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { existsSync } = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
 res.render("index");
});

app.post("/create", async (req, res) => {
  // check user existence   
  let {username, name, age, email, password} = req.body;

  let isUser = await userModel.findOne({email});
  if(isUser){
    return res.status(400).send("User already exists.")
  }

  // hash password
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password, salt, async(err, hash)=>{
      if(err){
        return res.status(500).send("Internal Server Error.")
      }
      password = hash;
      // create user
      let user = new userModel({username, name, age, email, password});
      
     let token = jwt.sign({email, userid:user._id}, "someScreteKey")
     res.cookie('token', token)
     res.send("User Resistered.")
      await user.save();
    })
  })
  
});


app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
