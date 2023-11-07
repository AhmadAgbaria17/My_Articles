const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define the Schema (the structure of the User)
const userSchema = new Schema({
    username:String,
    password: String,
    conPassword: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  });

  // Create a model based on that schema
const User = mongoose.model("User", userSchema);


// export the model
module.exports = User; 
