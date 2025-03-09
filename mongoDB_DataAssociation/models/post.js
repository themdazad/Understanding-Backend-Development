require("dotenv").config();

const mongoose = require("mongoose"); 

// creating postSchema
const postSchema = mongoose.Schema({
  postData: String,
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

// exporting this postShcema
module.exports = mongoose.model("post", postSchema);
