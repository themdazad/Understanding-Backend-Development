require("dotenv").config()

const mongoose = require("mongoose")

// connecting to mongoDB database 
mongoose.connect(process.env.CONNECTION_STRING)
.then(
    console.log('MongoDB connected. 😊')
).catch((err)=>{
  console.log(`Connection Error: ${err}`)  
})

// creating userSchema 

const userSchema = mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    age:{
        type:Number,
    },
    posts:[
       { type:mongoose.Schema.Types.Object0Id,
        ref:'post',
       }
    ]
})


// exporting this user shcema 
module.exports = mongoose.model('user', userSchema)