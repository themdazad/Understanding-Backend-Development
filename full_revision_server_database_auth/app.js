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
  let { username, name, age, email, password } = req.body;

  let isUser = await userModel.findOne({ email });
  if (isUser) {
    return res.status(400).send("User already exists.");
  }

  // hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return res.status(500).send("Internal Server Error.");
      }
      password = hash;
      // create user
      let user = new userModel({ username, name, age, email, password });

      let token = jwt.sign({ email, userid: user._id }, "someScreteKey");
      res.cookie("token", token);
      res.send("User Resistered.");
      await user.save();
    });
  });
});



app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLoggedIn, (req, res) => {
  res.send("You are authorized. Welcome to your profile.");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // checking user existence
  let isUser = await userModel.findOne({ email });
  if (!isUser) {
    return res.status(401).send("You are unauthorized!");
  }

    //if user exists 
    // compare there password with hashed password 
    bcrypt.compare(password, isUser.password, (err, result) => {
      if(err){
        return res.status(500).send("Internal Server Error.");
      }
      if(result){
        res.status(200).send("You can login now.");
        let token = jwt.sign({ email, userid: user._id }, "someScreteKey");
      res.cookie("token", token);
      }

    });

});

app.get("/logout", (req, res)=>{
  res.cookie("token", "", {maxAge: 0});
  res.redirect('login');
})


// Middleware function for user verification
isLoggedIn (req, res, next){
  //  check cookie is empty or not 
  if(req.cookies.token === ""){
    res.send("You are unauthorized.");
  }
  else{
  let data = jwt.verify(req.cookies.token, "someScreteKey");
  req.user = data;
  }
  next();
};

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
