const express = require("express");
const app = express();

// Importing Models
const userModel = require("./models/user");
const postModel = require("./models/post");
const { default: mongoose } = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/userCreate", async (req, res) => {
  // creating user using userModel
  let user = await userModel.create({
    username: "themdazad",
    email: "halabol@gmail.com",
    age: 23,
    post:[
    ]
  });
  res.send(user);
});

app.listen(3000, () => {
  console.log("Server is running on 🚀 http://localhost:3000");
});
