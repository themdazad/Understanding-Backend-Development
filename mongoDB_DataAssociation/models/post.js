require("dotenv").config();

const mongoose = require("mongoose");

// creating postSchema
const postSchema = mongoose.Schema({
  postData: String,
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

// exporting this postShcema
module.exports = mongoose.model("post", postSchema);
// here 'post' use in array of post in user model as reference
// ex: post:[
//       {type:moongoose.Schema.Types.ObjectId,
//  ref:'post'
// }
// ],
