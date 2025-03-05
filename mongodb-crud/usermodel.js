// connect -> schema -> model -> export 

const mongoose = require('mongoose') // To use mongoose, an ODM for mongoDB
const dotenv = require('dotenv') //To access environment variable
dotenv.config()

const database_url = process.env.DATABASE_URL;
console.log(database_url)

// Connecting to mongoDB database with mongoose ODM 
mongoose.connect(database_url)

.then(()=>{
    console.log("mongoDB is connected 😎")
}).catch((err)=>{
    console.log(`Something went wrong with mongoDB:${err}`)
})


// Creating user schema 
const userSchema = mongoose.Schema(
    {
        name:String, 
        username:String,
        useremail:String,
    }
)

// creating. and exporting model
// mongoose.model('user',userSchema)

// exporting model 
module.exports = mongoose.model("user",userSchema);