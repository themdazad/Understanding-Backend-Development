const express = require("express"); // To use express
const app = express();
const mongoose = require("mongoose"); // To use mongoose, an ODM for mongoDB
const userModel = require("./usermodel"); // Importing model created in usermodel.js
const dotenv = require("dotenv"); //To access environment variable
dotenv.config();

const port =  process.env.PORT || 3000
  // CRUD on mongoDB using mongoose

  // CREATE
  app.get("/create", async (req, res) => {
   let createdUser = await userModel.create({
      name: "golu",
      username: "thegolu",
      useremail: "golu@gmail.com"
    });
    res.send(createdUser)
  })

  // READ
  app.get("/read", async (req, res) => {
    let readUser = await userModel.find();
     res.send(readUser)
   })

  // UPDATE
  app.get("/update", async (req, res) => {
    let readUser = await userModel.findOneAndUpdate({ name: "Azad" }, {useremail:'UpdatedCollezian@gmail.com'},{new:true});
     console.log(readUser)
     res.send(readUser)

   })
  // DELETE
  app.get("/delete", async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({useremail:'sonu@gmail.com'});
     console.log(deletedUser) // allow to access deleted value once
     res.send(deletedUser)
   })


app.get("/", (req, res) => {
  res.send("Visit routes /create | /read | /update | /delete for perform CRUD on mongoDB using mongoose");
});

app.listen(port, () => {
  console.log(`Express is listening on port http://localhost:${port}`);
});
