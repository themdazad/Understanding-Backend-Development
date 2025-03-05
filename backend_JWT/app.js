const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  const { username, email, password, age } = req.body;
  // encrypting password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
    });
  });

  // generating jwt token
  const token = jwt.sign({ email }, "someSecreteKey");
  res.cookie("token", token); // saving token on frontend side in "token" variable
  res.redirect("/");
});

// logout
app.get("/logout", (req, res) => {
  // to remove coookies
  res.cookie("token", "");
  res.redirect("/");
});

//login page
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.send("Email or Password wrong!");
  }

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result){
        let token = jwt.sign({emai:user.email},"someSecreteKey")
        res.cookie("token", token)
        res.send("you can login")
    }
    else res.send("You can't login");
  });
});

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
