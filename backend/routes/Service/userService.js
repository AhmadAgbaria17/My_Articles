const bcryptjs = require("bcryptjs");
const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");


const getAllusers= (req,res) => {
  User.find(function(err,response){
    res.json(response)
  });
}


const postOneUser = (req,res)=>{
  const user = new User(req.body);

  user.save().then(result=>{
    res.redirect("/")
  })
  .catch(err=>{
    console.log(err)
  })
}


const checklogin = async (req) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });

    if (!user) {
      return "Incorrect username";
    }
  

    if (password!==user.password) {
      return "Incorrect password!";
    }
    let phone = "0" + user.phone;

    const tokenPayload = {
      username: user.username,
      email: user.email,
      phone: phone,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const JWTtoken = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    return {
      JWTtoken: JWTtoken,
    };
    
  } catch (error) {
    console.error(error);
    return "Failed to log in";
  }
}


module.exports= {
  postOneUser,
  checklogin,
  getAllusers,

}


