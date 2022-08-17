const jwt = require('jsonwebtoken');
const { Model } = require('mongoose');
const UserModel = require("../Model/user");

const auth =async (req,res,next)=>{
  try{
       const token = req.cookies.jwt;
       const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
       console.log(verifyUser);
       console.log(verifyUser._id);
       const user = await UserModel.findOne({_id:verifyUser._id})
       console.log("usertokenvalid",user.firstName);

       req.token = token;
       req.user = user;
       next();
       
  }catch(err){
       res.status(401).send(err);
  }

}
module.exports = auth;