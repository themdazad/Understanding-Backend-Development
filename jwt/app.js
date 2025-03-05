require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

app.use(cookieParser());  // middleware used to parse cookies


// root
app.get('/',(req, res)=>{
    res.send("Express is working!")
})

// set-cookie
app.get('/set-cookie',(req, res)=>{
    res.cookie('name','cookie_data')
    res.send("Cookie saved!")
})
// read-cookie
app.get('/read',(req, res)=>{
    console.log(req.cookies)
    res.send("Check you console!")
})
// other route
app.get('/other',(req, res)=>{
    res.send("I can also receive saved cookie!")
})

// _____________________________________________________________
// Bcrypt: Encryption 
// genSalt -> Salt -> Data, Salt -> hash 
app.get('/encryption',(req,res)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        console.log(`Your Bcrypt salt: ${salt} (Random generated)`)
            bcrypt.hash('Password',salt,(err,hash)=>{
                console.log(`Hashed Cookie Data: ${hash}`)
                // saving this hash in cookie 
                res.cookie('hash',hash);
                res.send(`Hashed Cookie Data: ${hash}`)
            })
    })
})
// Decryption : Compare hashed string with originalData
app.get('/decryption',(req,res)=>{
    bcrypt.compare('Password','$2b$10$qie3SrlXL8KtuIaLBf9FdeT8Evfnt0UW3uU6BU6AmbyIw9l9Q8FXa',(err,result)=>{
       console.log(result)
       res.send("Password is currect!")
    })
  
})



// _____________________________________________________________
// JWT: JsonWebToken

app.get('/genToken',(req, res)=>{
        const token = jwt.sign({email:"collezian@gmail.com"}, SECRET_KEY);
        res.cookie('Token',token)
        res.send('Token Created')
        console.log(`Token : ${Token}`)
})
app.get('/readToken',(req, res)=>{
    res.send("Check token in console!")
       console.log(req.cookies)
})
app.get('/readTokenData',(req, res)=>{
   jwt.verify(req.cookies.Token, SECRET_KEY )
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
