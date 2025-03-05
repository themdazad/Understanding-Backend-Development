const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// connection 
mongoose.connect(process.env.DATABASE_URL)
    .then(
        console.log(`mongoDB connected 😎`)
    ).catch((err)=>{
        console.log(`mongoDB connection failed! :👉 ${err}`)
    })

// user schema 
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    image_url:String
})

// user model
module.exports = mongoose.model('user',userSchema)