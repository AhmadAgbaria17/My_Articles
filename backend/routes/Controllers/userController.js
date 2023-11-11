const express = require("express");
const router = express.Router();


const userServices = require("../Service/userService")

router.get("/", userServices.getAllusers)


router.post("/signup",userServices.postOneUser)


router.post("/login", async (req,res)=>{
  const result = await userServices.checklogin(req);
  if(typeof result == "string"){
    if (result.startsWith("Incorrect")){
      res.status(400).json({success: false, result});
    }
  }else{

    res.status(200).json({success:true , accessToken: result.JWTtoken })
  }
})





module.exports = router